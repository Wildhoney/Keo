/**
 * @module Keo
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Keo
 */
import objectAssign from 'object-assign';
import {createClass} from 'react';
import {compose, composeDeferred} from 'funkel';
export {memoize, trace, partial} from 'funkel';
export {objectAssign, compose, composeDeferred};

/**
 * @method isFunction
 * @param {*} fn
 * @return {Boolean}
 */
const isFunction = fn => typeof fn === 'function';

/**
 * @property resolving
 * @type {Map}
*/
const resolving = new Map();

/**
 * @method isPromise
 * @param {*} x
 * @return {Boolean}
 */
function isPromise(x) {
    return 'then' in Object(x);
}

/**
 * @method isObservable
 * @param {*} x
 * @return {Boolean}
 */
function isObservable(x) {
    return 'subscribe' in Object(x);
}

/**
 * @method isObject
 * @param {*} x
 * @return {Boolean}
 */
function isObject(x) {
    return typeof x === 'object';
}

/**
 * @method isFuture
 * @param {Object} cursor
 * @return {Boolean}
 */
const isFuture = cursor => {
    return isPromise(cursor) || isObservable(cursor);
};

/**
 * @method containsFuture
 * @param {*} cursor
 * @return {Boolean}
 */
const containsFuture = cursor => {

    return isFuture(cursor) || (() => {

        if (Array.isArray(cursor)) {

            // Determine if an array was passed, which includes a promise.
            return cursor.some(item => isFuture(item));

        }

        return false;

    })();

};

/**
 * @method createWithCompose
 * @param {Object} component
 * @return {createClass}
 */
export const createWithCompose = component => {

    /**
     * @method passArguments
     * @return {Object}
     */
    function passArguments() {

        if (!resolving.has(this)) {

            // Define the resolving as an object for adding items to.
            resolving.set(this, {});

        }

        /**
         * @method isResolving
         * @param {Boolean} value
         * @return {void}
         */
        const isResolving = value => resolving.get(!!value);

        /**
         * @method orObject
         * @param {*} x
         * @return {Object}
         */
        const orObject = x => x || {};

        /**
         * @method element
         * @param {String} ref
         * @return {HTMLElement}
         */
        const element = ref => {
            return this.refs[ref];
        };

        /**
         * @method refs
         * @type {Proxy|Object}
         */
        const refs = typeof Proxy === 'undefined' ? {} : new Proxy(this.refs, {

            /**
             * @method get
             * @param {Object} target
             * @param {String} key
             */
            get: (target, key) => this.refs[key]

        });

        const props = orObject(this.props);
        const state = orObject(this.state);
        const context = orObject(this.context);
        const forceUpdate = this::this.forceUpdate;

        /**
         * @method dispatch
         * @param {*} model
         * @type {*|Function}
         */
        const dispatch = (...model) => {

            if (isPromise(model)) {
                return model.then(x => dispatch(model));
            }

            model != null && props.dispatch && props.dispatch(...model);
            return model;

        };

        /**
         * @method setState
         * @param {Object} state
         * @return {Object}
         */
        const setState = state => {

            if (isPromise(state)) {
                return state.then(x => setState(x));
            }

            /**
             * @method keyToState
             * @param {Object} accumulator
             * @param {String} key
             * @return {Object}
             */
            const keyToState = (accumulator, key) => {
                accumulator[key] = state[key];
                return accumulator;
            };

            /**
             * @property immediateState
             * @type {Object}
             */
            const immediateState = (() => {

                if (isPromise(state)) {

                    // Defer promise states until they have been resolved.
                    state.then(value => setState(value));
                    return null;

                }

                if (state && isObject(state)) {

                    const keys = Object.keys(state);

                    // Determine which state items yield promises, and which yield immediate values.
                    const futureStates = keys.filter(key => containsFuture(state[key])).reduce(keyToState, {});

                    // Iterate over each future state to apply the state once the promise has been resolved.
                    Object.keys(futureStates).map(key => {

                        const cursor = state[key];

                        if (isPromise(cursor)) {

                            isResolving(true);

                            // Resolve a simple promise contained within an object.
                            state[key].then(value => {

                                // Succeeded! We'll therefore update the value.
                                isResolving(false);
                                setState({ [key]: value });

                            }).catch(() => {

                                // Failed! In which case we'll simply re-render.
                                isResolving(false);
                                forceUpdate();

                            });

                        }

                        if (Array.isArray(cursor)) {

                            // Await all promises to resolve before setting the state.
                            const promises = cursor.filter(item => isPromise(item));
                            const items = cursor.filter(item => !isPromise(item));

                            isResolving(true);

                            Promise.all(promises).then(array => {

                                // Succeeded! Therefore we'll merge the new items in with the existing items.
                                isResolving(false);
                                setState({ [key]: [...items, ...array] });

                            }).catch(() => {

                                // Failed! We'll therefore display only the existing items.
                                isResolving(false);
                                setState({ [key]: items });

                            });

                        }

                    });

                    return keys.filter(key => !containsFuture(state[key])).reduce(keyToState, {});

                }

            })();

            const notEmpty = isObject(immediateState) ? Object.keys(immediateState).length : immediateState != null;
            notEmpty && this.setState(immediateState);
            return immediateState;

        };

        return { props, state, setState, dispatch, element, refs, context, forceUpdate };

    }

    /**
     * @method orFunction
     * @param {Function} fn
     * @return {Function}
     */
    function orFunction(fn) {
        return isFunction(fn) ? fn : () => {};
    }

    return createClass(objectAssign({}, component, {

        /**
         * @method componentWillMount
         * @return {*}
         */
        componentWillMount: pipe(passArguments, orFunction(component.componentWillMount)),

        /**
         * @method componentDidMount
         * @return {*}
         */
        componentDidMount: pipe(passArguments, orFunction(component.componentDidMount)),

        /**
         * @method componentWillReceiveProps
         * @param nextProps {Object}
         * @return {*}
         */
        componentWillReceiveProps(nextProps) {
            orFunction(component.componentWillReceiveProps)(nextProps, passArguments.apply(this));
        },

        /**
         * @method componentWillUpdate
         * @param prevProps {Object}
         * @return {*}
         */
        componentWillUpdate(prevProps) {

            orFunction(component.componentWillUpdate)(prevProps, objectAssign({}, passArguments.apply(this), {
                setState: state => state
            }));

        },

        /**
         * @method componentDidUpdate
         * @param prevProps {Object}
         * @param prevState {Object}
         * @return {*}
         */
        componentDidUpdate(prevProps, prevState) {
            orFunction(component.componentDidUpdate)(prevProps, prevState, passArguments.apply(this));
        },

        /**
         * @method componentWillUnmount
         * @return {*}
         */
        componentWillUnmount: pipe(passArguments, orFunction(component.componentWillUnmount)),

        /**
         * @method render
         * @return {XML}
         */
        render: pipe(passArguments, component.render)

    }));

};

/**
 * @method stitch
 * @param {Object|Function} component
 * @return {createClass}
 */
export const stitch = component => {
    return createWithCompose(wrap(component));
};

/**
 * @method wrap
 * @param {Object|Function} object
 * @return {Object}
 */
export const wrap = object => {
    return isFunction(object) ? { render: object } : object;
};

/**
 * @method pipe
 * @param {Function} fns
 * @return {Function}
 */
export const pipe = (...fns) => {
    return compose(...fns.reverse());
};

/**
 * @method pipeDeferred
 * @param {Function} fns
 * @return {Promise}
 */
export const pipeDeferred = (...fns) => {
    return composeDeferred(...fns.reverse());
};

/**
 * @method resolutionMap
 * @param {Array} args
 * @return {Array}
 */
export const resolutionMap = function(args) {

    return objectAssign({}, args, {
        props: { ...args.props, resolving: resolving.get(this) }
    });

};

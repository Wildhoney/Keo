/**
 * @module Keo
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Keo
 */
import objectAssign from 'object-assign';
import {createClass} from 'react';
import WeakMap from 'es6-weak-map';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {compose, composeDeferred} from 'funkel';
export {memoize, trace, partial} from 'funkel';
export {objectAssign, compose, composeDeferred};

/**
 * @method getArgs
 * @param {Object} args
 * @return {Function}
 */
const getArgs = args => {

    return () => {

        console.table(Object.keys(args).filter(key => key !== 'debug').sort().reduce((accumulator, key) => {
            return [ ...accumulator, { name: key, type: typeof args[key] }];
        }, []));

    };

};

/**
 * @method isFunction
 * @param {*} fn
 * @return {Boolean}
 */
const isFunction = fn => typeof fn === 'function';

/**
 * @property resolving
 * @type {WeakMap}
*/
const resolving = new WeakMap();

/**
 * @method isPromise
 * @param {*} x
 * @return {Boolean}
 */
function isPromise(x) {
    return 'then' in Object(x);
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
    return isPromise(cursor);
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
 * @return {React.createClass}
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
         * @param {String} key
         * @param {Boolean} value
         * @return {void}
         */
        const isResolving = (key, value) => resolving.get(this)[key] = !!value;

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

                            isResolving(key, true);

                            // Resolve a simple promise contained within an object.
                            state[key].then(value => {

                                // Succeeded! We'll therefore update the value.
                                isResolving(key, false);
                                setState({ [key]: value });

                            }).catch(() => {

                                // Failed! In which case we'll simply re-render.
                                isResolving(key, false);
                                forceUpdate();

                            });

                        }

                        if (Array.isArray(cursor)) {

                            // Await all promises to resolve before setting the state.
                            const promises = cursor.filter(item => isPromise(item));
                            const items = cursor.filter(item => !isPromise(item));

                            isResolving(key, true);

                            Promise.all(promises).then(array => {

                                // Succeeded! Therefore we'll merge the new items in with the existing items.
                                isResolving(key, false);
                                setState({ [key]: [...items, ...array] });

                            }).catch(() => {

                                // Failed! We'll therefore display only the existing items.
                                isResolving(key, false);
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

        const args = { props, state, setState, dispatch, element, refs, context, forceUpdate };
        return { ...args, debug: getArgs(args) };

    }

    /**
     * @method orFunction
     * @param {Function} fn
     * @param {*} [returnValue = undefined]
     * @return {Function}
     */
    function orFunction(fn, returnValue = undefined) {
        return isFunction(fn) ? fn : () => returnValue;
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
         * @return {void}
         */
        componentWillReceiveProps(nextProps) {
            const args = { ...passArguments.apply(this), nextProps };
            orFunction(component.componentWillReceiveProps)({ ...args, debug: getArgs(args) });
        },

        /**
         * @method shouldComponentUpdate
         * @param nextProps {Object}
         * @param nextState {Object}
         * @return {Boolean}
         */
        shouldComponentUpdate(nextProps, nextState) {
            const args = { ...passArguments.apply(this), nextProps, nextState };
            return orFunction(component.shouldComponentUpdate, true)({ ...args, debug: getArgs(args) });
        },

        /**
         * @method componentWillUpdate
         * @param nextProps {Object}
         * @param nextState {Object}
         * @return {void}
         */
        componentWillUpdate(nextProps, nextState) {
            const args = { ...passArguments.apply(this), nextProps, nextState };
            delete args.setState;
            orFunction(component.componentWillUpdate)({ ...args, debug: getArgs(args) });
        },

        /**
         * @method componentDidUpdate
         * @param prevProps {Object}
         * @param prevState {Object}
         * @return {void}
         */
        componentDidUpdate(prevProps, prevState) {
            const args = { ...passArguments.apply(this), prevProps, prevState };
            orFunction(component.componentDidUpdate)({ ...args, debug: getArgs(args) });
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

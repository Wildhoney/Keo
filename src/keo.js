/**
 * @module Keo
 * @link https://github.com/Wildhoney/Keo
 * @author Adam Timberlake
 */
import objectAssign from 'object-assign';
import {createClass} from 'react';
import * as fnkl from 'funkel';
export {memoize, trace, partial} from 'funkel';
export {objectAssign};

/**
 * @method isFunction
 * @param {*} fn
 * @return {Boolean}
 */
const isFunction = fn => typeof fn === 'function';

/**
 * @property resolving
 * @type {Object}
 */
const resolving = {};

/**
 * @method resolutionMap
 * @param {Array} args
 * @return {Array}
 */
export const resolutionMap = args => {

    return Object.assign({}, args, {
        props: { ...args.props, resolving }
    });

};

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

        const {refs = {}, props = {}, state = {}, context = {}} = this;
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

                    /**
                     * @method containsPromise
                     * @param {String} key
                     * @return {Boolean}
                     */
                    const containsPromise = key => {

                        const cursor = state[key];

                        return isPromise(cursor) || (() => {

                            if (Array.isArray(cursor)) {

                                // Determine if an array was passed, which includes a promise.
                                return cursor.some(item => isPromise(item));

                            }

                            return false;

                        })();

                    };

                    // Determine which state items yield promises, and which yield immediate values.
                    const futureStates = keys.filter(key => containsPromise(key)).reduce(keyToState, {});

                    // Iterate over each future state to apply the state once the promise has been resolved.
                    Object.keys(futureStates).map(key => {

                        const cursor = state[key];

                        if (isPromise(cursor)) {

                            resolving[key] = true;

                            // Resolve a simple promise contained within an object.
                            state[key].then(value => {
                                resolving[key] = false;
                                setState({ [key]: value });
                            });
                        }

                        if (Array.isArray(cursor)) {

                            // Await all promises to resolve before setting the state.
                            const promises = cursor.filter(item => isPromise(item));
                            const items = cursor.filter(item => !isPromise(item));

                            resolving[key] = true;

                            Promise.all(promises).then(array => {
                                resolving[key] = false;
                                setState({ [key]: [...items, ...array] });
                            });

                        }

                    });

                    return keys.filter(key => !containsPromise(key)).reduce(keyToState, {});

                }

            })();

            const notEmpty = isObject(immediateState) ? Object.keys(immediateState).length : immediateState != null;
            notEmpty && this.setState(immediateState);
            return immediateState;

        };

        return { props, state, setState, dispatch, refs, context, forceUpdate };

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
         * @return {Object}
         */
        componentWillMount: compose(passArguments, orFunction(component.componentWillMount)),

        /**
         * @method componentDidMount
         * @return {Object}
         */
        componentDidMount: compose(passArguments, orFunction(component.componentDidMount)),

        /**
         * @method componentWillUnmount
         * @return {Object}
         */
        componentWillUnmount: compose(passArguments, orFunction(component.componentWillUnmount)),

        /**
         * @method render
         * @return {XML}
         */
        render: compose(passArguments, component.render)

    }));

};

/**
 * @method stitch
 * @param {Object|Function} component
 * @return {React.createClass}
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
 * @method compose
 * @param {Function} fns
 * @return {Function}
 */
export const compose = (...fns) => {
    return fnkl.compose(...fns.reverse());
};

/**
 * @method composeDeferred
 * @param {Function} fns
 * @return {Promise}
 */
export const composeDeferred = (...fns) => {
    return fnkl.composeDeferred(...fns.reverse());
};

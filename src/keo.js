/**
 * @module Keo
 * @link https://github.com/Wildhoney/Keo
 * @author Adam Timberlake
 */
import objectAssign from 'object-assign';
import {createClass} from 'react';
import {compose as composeRight} from 'funkel';
export {memoize, trace, partial} from 'funkel';
export {objectAssign};

/**
 * @method isFunction
 * @param {*} fn
 * @return {Boolean}
 */
const isFunction = fn => typeof fn === 'function';

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

        /**
         * @method orObject
         * @param {Object} item
         * @return {Object}
         */
        const orObject = item => {
            return item || {};
        };

        const refs = orObject(this.refs);
        const props = orObject(this.props);
        const state = orObject(this.state);
        const context = orObject(this.context);
        const forceUpdate = this.forceUpdate.bind(this);

        /**
         * @method dispatch
         * @param {*} emit
         * @type {*|Function}
         */
        const dispatch = (...emit) => {
            props.dispatch && props.dispatch(...emit);
            return emit;
        };

        /**
         * @method setState
         * @param {Object} state
         * @return {Object}
         */
        const setState = state => {
            state != null && this.setState(state);
            return state;
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
 * @param {Object} component
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
    return composeRight(...fns.reverse());
};

/**
 * @module Keo
 * @link https://github.com/Wildhoney/Keo
 * @author Adam Timberlake
 */
import objectAssign from 'object-assign';
import {createClass} from 'react';
import {memoize, trace, partial, compose as composeRight} from 'funkel';
export {objectAssign};

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
         * @param {String} ref
         * @return {Object}
         */
        function orObject(ref) {
            return this[ref] || {};
        }

        const refs     = orObject(this.refs);
        const props    = orObject(this.props);
        const state    = orObject(this.state);
        const context  = orObject(this.context);
        const dispatch = props.dispatch || (() => {});

        /**
         * @method setState
         * @param {Object} state
         * @return {void}
         */
        const setState = state => {
            state != null && this.setState(state);
        };

        /**
         * @method setStateDispatch
         * @param {Object} state
         * @param {Object} model
         * @return {void}
         */
        const setStateDispatch = ([state, model]) => {
            setState(state);
            dispatch(model);
        };

        return { props, state, setState, dispatch, refs, context, setStateDispatch };

    }

    /**
     * @method orFunction
     * @param {Function} fn
     * @return {Function}
     */
    function orFunction(fn) {
        return typeof fn === 'function' ? fn : () => {};
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
    return createWithCompose(component);
};

/**
 * @method compose
 * @param {Function[]} fns
 * @return {Function}
 */
export const compose = (...fns) => {
    return composeRight(...fns.reverse());
};

/**
 * @module Keo
 * @link https://github.com/Wildhoney/Keo
 * @author Adam Timberlake
 */
import objectAssign from 'object-assign';
import {createClass} from 'react';
import {compose as composeRight} from 'funkel';
import {connect} from 'react-redux';
export {memoize, trace, partial} from 'funkel';
export {objectAssign};

/**
 * @method create
 * @param {Object} component
 * @return {React.createClass}
 */
const createWithCompose = component => {

    /**
     * @method passArguments
     * @return {Object}
     */
    function passArguments() {

        const refs     = this.refs || {};
        const props    = this.props || {};
        const state    = this.state || {};
        const context  = this.context || {};
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
         * @param {Object} stateProps
         * @param {Object} dispatchProps
         * @return {void}
         */
        const setStateDispatch = ([stateProps, dispatchProps]) => {
            setState(stateProps);
            dispatch(dispatchProps);
        };

        return { props, state, setState, dispatch, refs, context, setStateDispatch };

    }

    /**
     * @method orNoop
     * @param {Function} fn
     * @return {Function}
     */
    function orNoop(fn) {
        return typeof fn === 'function' ? fn : () => {};
    }

    return createClass(objectAssign({}, component, {

        /**
         * @method componentWillMount
         * @return {Object}
         */
        componentWillMount: compose(passArguments, orNoop(component.componentWillMount)),

        /**
         * @method componentDidMount
         * @return {Object}
         */
        componentDidMount: compose(passArguments, orNoop(component.componentDidMount)),

        /**
         * @method componentWillUnmount
         * @return {Object}
         */
        componentWillUnmount: compose(passArguments, orNoop(component.componentWillUnmount)),

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
 * @param {Function} fns
 * @return {Function}
 */
export const compose = (...fns) => {
    return composeRight(...fns.reverse());
};

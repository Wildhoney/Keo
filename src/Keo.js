/**
 * @module Keo
 * @link https://github.com/Wildhoney/Keo
 * @author Adam Timberlake
 */
import objectAssign from 'object-assign';
import {createClass} from 'react';
import {compose as composeRight} from 'funkel';
export {memoize, trace} from 'funkel';

/**
 * @constant cache
 * @type {WeakMap}
 */
const cache = new WeakMap();

/**
 * @method create
 * @param {Object} component
 * @return {Object}
 */
const createWithCompose = component => {

    /**
     * @method passArguments
     * @return {Object}
     */
    function passArguments() {

        const refs     = this.refs || {};
        const context  = this.context || {};
        const props    = this.props || {};
        const state    = this.state || {};
        const dispatch = props.dispatch;
        const setState = function setState(state) {
            state != null && this.setState(state);
        }.bind(this);

        return { props, state, setState, dispatch, refs, context };

    }

    /**
     * @method orNoop
     * @param {Function} fn
     * @return {Function}
     */
    function orNoop(fn) {
        return (typeof fn === 'function') ? fn : () => {};
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

    const cached = cache.get(component);

    return cached ? cached : (() => {

        // Compose the component and the base for an improved UX.
        const reactComponent = createWithCompose(component);

        // Store in cache and then return.
        cache.set(component, reactComponent);
        return reactComponent;

    })();

};

/**
 * @method compose
 * @param {Function} fns
 * @return {Function}
 */
export const compose = (...fns) => {
    return composeRight(...fns.reverse());
};

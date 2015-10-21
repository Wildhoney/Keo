/**
 * @module Keo
 * @link https://github.com/Wildhoney/Keo
 * @author Adam Timberlake
 */
import objectAssign from 'object-assign';
import {createClass} from 'react';

/**
 * @constant cache
 * @type {Map}
 */
const cache = new Map();

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

        const props    = this.props || {};
        const dispatch = props.dispatch;
        const state    = this.state || {};
        const refs     = this.refs || {};
        const context  = this.context || {};
        const setState = this.setState.bind(this);

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

    return createClass(Object.assign({}, component, {

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

    return function (a) {
        return fns.reduce(function(acc, fn) {
            return fn.call(this, acc);
        }.bind(this), a);
    };

};

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
     * @property args
     * @type {Object}
     */
    const args = {};

    /**
     * @method passArguments
     * @return {Object}
     */
    function passArguments() {
        return args;
    }

    /**
     * @method collectArguments
     * @return {Object}
     */
    function collectArguments() {
        args.props    = this.props;
        args.state    = this.state;
        args.setState = this.setState;
        args.dispatch = () => {};
        return args;
    }

    return createClass(Object.assign({}, component, {

        /**
         * @method componentWillMount
         * @return {Object}
         */
        componentWillMount: compose(collectArguments),

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
 * @param {Function[]} fns
 * @return {Function}
 */
export const compose = (...fns) => {

    return function (a) {
        return fns.reduce(function(acc, fn) {
            return fn.call(this, acc);
        }.bind(this), a);
    };

};

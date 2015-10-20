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
export const create = component => {

    return createClass(Object.assign({}, component, {

        /**
         * @method render
         * @return {XML}
         */
        render: function render() {

            const setState = this.setState;
            const props    = this.props;
            const state    = this.state;

            return component.render({ setState, props, state });

        }

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
        const component = create(component);

        // Store in cache and then return.
        cache.set(component, component);
        return component;

    })();

};

/**
 * @method compose
 * @param {Function[]} fns
 * @return {Function}
 */
export const compose = (...fns) => {

};

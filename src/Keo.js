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
 * @method createComponent
 * @param {Object} fns
 * @return {Object}
 */
const createComponent = fns => {

    return objectAssign({}, fns, {

        /**
         * @method render
         * @return {XML}
         */
        render: function render() {

            const setState = this.setState;
            const props    = this.props;
            const state    = this.state;

            return fns.render({ setState, props, state });

        }

    });

};

/**
 * @method keo
 * @param {Object} fns
 * @return {React.createClass}
 */
export default (fns) => {

    const cached = cache.get(fns);
    return cached ? cached : (() => {
        const component = createClass(createComponent(fns));
        cache.set(fns, component);
        return component;
    })();

}

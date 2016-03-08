import { createClass } from 'react';
import WeakMap from 'es6-weak-map';
import PureRenderMixin from 'react-addons-pure-render-mixin';

/**
 * @method stitch
 * @param {Object} fns
 * @type {createClass}
 */
export const stitch = fns => {
    const component = typeof fns === 'function' ? { render: fns } : fns;
    return createClass(component);
};

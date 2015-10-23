/**
 * @module Keo
 * @submodule Redux
 * @link https://github.com/Wildhoney/Keo
 * @author Adam Timberlake
 */
import {createWithCompose} from './Keo';
import {connect} from 'react-redux';
import {objectAssign} from 'object-assign';
export {memoize, trace, partial} from 'funkel';
export {compose} from './Keo';
export {objectAssign};

/**
 * @method stitch
 * @param {Object} component
 * @param {Function|Object} reducerOptions
 * @return {React.createClass}
 */
export const stitch = (component, reducerOptions) => {
    return connect(reducerOptions)(createWithCompose(component));
};

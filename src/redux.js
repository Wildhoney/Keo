/**
 * @module Keo
 * @submodule Redux
 * @link https://github.com/Wildhoney/Keo
 * @author Adam Timberlake
 */
import {createWithCompose} from './keo';
import {connect} from 'react-redux';
import objectAssign from 'object-assign';
export {memoize, trace, partial} from 'funkel';
export {compose} from './keo';
export {objectAssign};

/**
 * @method stitch
 * @param {Object} component
 * @param {Function} mapStateToProps
 * @param {Object|Function} mapDispatchToProps
 * @param {Function} mergeProps
 * @param {Object} options
 * @return {React.createClass}
 */
export const stitch = (component, mapStateToProps, mapDispatchToProps, mergeProps, options) => {
    return connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(createWithCompose(component));
};

/**
 * @module Keo
 * @submodule Redux
 * @link https://github.com/Wildhoney/Keo
 * @author Adam Timberlake
 */
import {createWithCompose, wrap} from './keo';
import {connect} from 'react-redux';
export {memoize, trace, partial} from 'funkel';
export {default as objectAssign} from 'object-assign';
export {compose, composeDeferred} from './keo';

/**
 * @method stitch
 * @param {Object|Function} component
 * @param {Function} [mapStateToProps]
 * @param {Object|Function} [mapDispatchToProps]
 * @param {Function} [mergeProps]
 * @param {Object} [options]
 * @return {React.createClass}
 */
export const stitch = (component, mapStateToProps, mapDispatchToProps, mergeProps, options) => {

    return connect(
        mapStateToProps,
        mapDispatchToProps,
        mergeProps,
        options
    )(createWithCompose(wrap(component)));

};

/**
 * @module Keo
 * @submodule Redux
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Keo
 */
import {createWithCompose, wrap} from './keo';
import {connect} from 'react-redux';
export {memoize, trace, partial, compose, composeDeferred} from 'funkel';
export {default as objectAssign} from 'object-assign';
export {pipe, pipeDeferred, resolutionMap} from './keo';

/**
 * @method stitch
 * @param {Object|Function} component
 * @param {Function} [mapStateToProps]
 * @return {React.createClass}
 */
export const stitch = (component, mapStateToProps) => {
    return connect(mapStateToProps)(createWithCompose(wrap(component)));
};

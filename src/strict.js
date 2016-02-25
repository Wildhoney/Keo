/**
 * @module Keo
 * @submodule Strict
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Keo
 */
import {createWithCompose, wrap} from './keo';
export {memoize, trace, partial, compose, composeDeferred} from 'funkel';
export {default as objectAssign} from 'object-assign';
export {pipe, pipeDeferred, resolutionMap} from './keo';

/**
 * @method stitch
 * @param {Object|Function} component
 * @return {React.createClass}
 */
export const stitch = component => {
    return createWithCompose(wrap(component), true);
};

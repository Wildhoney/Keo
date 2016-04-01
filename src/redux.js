import { stitch as baseStitch } from './keo';
import { connect } from 'react-redux';

/**
 * @method stitch
 * @param {Object|Function} definition
 * @param {Function} [mapStateToProps = state => state]
 * @return {createClass}
 */
export const stitch = (definition, mapStateToProps = state => state) => {
    console.info('Keo: `keo/redux` has been deprecated, please instead use `keo` directly passing in `mapStateToProps` as the second argument.');
    return baseStitch(definition, mapStateToProps);
};

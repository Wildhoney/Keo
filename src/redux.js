import * as keo from './keo';
import { memoize } from 'ramda';
import { connect } from 'react-redux';

/**
 * @method stitch
 * @param {Object|Function} definition
 * @param {Function} [mapStateToProps = state => state]
 * @return {React.createClass}
 */
export const stitch = memoize((definition, mapStateToProps = state => state) => {
    return connect(mapStateToProps)(keo.stitch(definition));
});

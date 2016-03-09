import React, { PropTypes } from 'react';
import { stitch } from '../../../src/redux';

/**
 * @constant PropTypes
 * @type {Object}
 */
const propTypes = {
    country: PropTypes.array.isRequired
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({ props }) => {
    console.log('Re-render');
    return <h1>Countries ({ props.country.length })</h1>
};

export default stitch({ propTypes, render });

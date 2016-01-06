import React from 'react';
import {stitch} from '../../src/keo';

/**
 * @method getDefaultProps
 * @return {{name: string}}
 */
const getDefaultProps = () => {
    return { name: 'Geraldine' };
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({ props }) => {
    return <h1>{props.name}</h1>
};

export default stitch({ render, getDefaultProps });

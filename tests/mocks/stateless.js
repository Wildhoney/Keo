import React from 'react';
import {stitch} from '../../src/keo';

/**
 * @method stateless
 * @param {Function} setState
 * @return {XML}
 */
const stateless = ({ setState }) => {
    return <button onClick={() => setState({ name: 'Dorothy' })} />
};

export default stitch(stateless);

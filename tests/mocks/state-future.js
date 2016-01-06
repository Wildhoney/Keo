import React from 'react';
import {stitch} from '../../src/keo';

/**
 * @method render
 * @param {Function} setState
 * @return {XML}
 */
const render = ({ setState }) => {
    return <button onClick={() => setState({ name: Promise.resolve('Spencer') })} />
};

export default stitch({ render });

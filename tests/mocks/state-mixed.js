import React from 'react';
import {stitch} from '../../src/keo';

/**
 * @method render
 * @param {Function} setState
 * @return {XML}
 */
const render = ({ setState }) => {
    return <button onClick={() => setState({
        name: Promise.resolve('Donovan'),
        age: 45,
        visited: ['Argentina', 'Maldives', Promise.resolve('Brazil')],
        friends: true
    })} />
};

export default stitch({ render });

import React, { PropTypes } from 'react';
import { stitch } from '../../../src/keo';

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({ props }) => {

    return (
        <section className="keo" >
            {props.children}
        </section>
    );

};

export default stitch(render);

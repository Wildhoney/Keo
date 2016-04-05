import React, { PropTypes } from 'react';
import { compose } from 'ramda';
import { stitch, shadow } from '../../../src/keo';

/**
 * @method render
 * @return {XML}
 */
const render = compose(shadow('css/components/add-todo.css'), () => {

    return (
        <section className="add-todo" onClick={() => console.log('container!')}>
            <input onClick={e => console.log('input!')} autofocus />
        </section>
    )

});

export default stitch({ render });

import React, { PropTypes } from 'react';
import { compose } from 'ramda';
import { stitch, shadow } from '../../../src/keo';

/**
 * @method render
 * @return {XML}
 */
const render = compose(shadow('css/components/add-todo.css'), () => {

    return (
        <add-todo className="test" onClick={() => console.log('container!')}>
            <input onClick={e => console.log('input!')} autofocus />
        </add-todo>
    )

});

export default stitch({ render });

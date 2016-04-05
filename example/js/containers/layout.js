import React, { PropTypes } from 'react';
import { stitch } from '../../../src/keo';
import AddTodo from '../components/add-todo.js';

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({ props }) => {

    return (
        <main>
            
            <AddTodo {...props} />
            
            {props.children}
            
        </main>
    );

};

export default stitch(render);

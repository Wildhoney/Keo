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
        <section className="todo-app">
            
            <AddTodo {...props} />
            
            {props.children}
            
        </section>
    );

};

export default stitch(render);

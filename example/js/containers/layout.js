import React, { PropTypes } from 'react';
import { stitch } from '../../../src/keo';
import AddTodo from '../components/add-todo.js';
import ListTodos from '../components/list-todos.js';

/**
 * @constant propTypes
 * @type {Object}
 */
const propTypes = {
    todos: PropTypes.array.isRequired,
    form: PropTypes.shape({
        text: PropTypes.string.isRequired
    })
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({ props }) => {

    return (
        <main>
            <AddTodo {...props} />
            <ListTodos {...props} />
        </main>
    );

};

export default stitch({ propTypes, render }, state => state);

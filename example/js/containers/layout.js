import React, { PropTypes } from 'react';
import { stitch } from '../../../src/keo';
import AddTodo from '../components/add-todo.js';
import ListTodos from '../components/list-todos.js';
import FilterTodos from '../components/filter-todos.js';
import { DONE } from '../actions';

/**
 * @constant propTypes
 * @type {Object}
 */
const propTypes = {
    todos: PropTypes.array.isRequired,
    form: PropTypes.shape({
        text: PropTypes.string.isRequired
    }),
    params: PropTypes.shape({
        status: PropTypes.string
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

            <footer>
                <span>{props.todos.filter(x => x.status === DONE).length}/{props.todos.length} Done</span>
                <FilterTodos {...props} />
            </footer>

        </main>
    );

};

export default stitch({ propTypes, render }, state => state);

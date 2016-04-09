import React, { PropTypes } from 'react';
import { compose, curry } from 'ramda';
import { emojify } from 'react-emoji';
import { stitch, shadow, custom } from '../../../src/keo';
import { setTodo, removeTodo, DONE, PROGRESS } from '../actions';

/**
 * @constant propTypes
 * @type {Object}
 */
const propTypes = {
    todos: PropTypes.array.isRequired,
    params: PropTypes.shape({
        status: PropTypes.string
    })
};

/**
 * @method getTodos
 * @param {Array} collection
 * @param {String} filterBy
 * @return {XML[]}
 */
const getTodos = curry((dispatch, collection, filterBy) => {

    /**
     * @method byStatus
     * @param {Object} model
     * @return {Boolean}
     */
    const byStatus = model => {

        switch (filterBy) {
            case 'done': return model.status === DONE;
            case 'progress': return model.status === PROGRESS;
            default: return true;
        }

    };

    return collection.filter(byStatus).map(model => {

        return (
            <li key={model.id}>
                <a className={model.status === DONE ? 'done' : ''}
                   onClick={() => dispatch(setTodo(model.id, model.status === DONE ? PROGRESS : DONE))}>
                    {emojify(model.text)}
                </a>
                <a onClick={() => dispatch(removeTodo(model.id))}>Delete</a>
            </li>
        );

    });

});

/**
 * @method render
 * @param {Object} props
 * @param {Function} dispatch
 * @return {XML}
 */
const render = compose(shadow('css/components/list-todos.css'), custom, ({ props, dispatch }) => {

    return (
        <list-todos>
            <ul>
                {getTodos(dispatch)(props.todos, props.params.status)}
            </ul>
        </list-todos>
    )

});

export default stitch({ propTypes, render });

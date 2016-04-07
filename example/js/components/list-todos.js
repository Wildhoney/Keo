import React, { PropTypes } from 'react';
import { compose } from 'ramda';
import { stitch, shadow } from '../../../src/keo';
import { setTodo, DONE, PROGRESS } from '../actions';

/**
 * @constant propTypes
 * @type {Object}
 */
const propTypes = {
    todos: PropTypes.array.isRequired
};

/**
 * @method getTodos
 * @param {Array} collection
 * @param {Function} setAs
 * @return {XML[]}
 */
const getTodos = (collection, setAs) => {

    return collection.map(model => {

        return (
            <li key={model.id}>
                <a className={model.status === DONE ? 'done' : ''}
                   onClick={() => setAs(model, model.status === DONE ? PROGRESS : DONE)}>
                    {model.text}
                </a>
            </li>
        );

    });

};

/**
 * @method render
 * @param {Object} props
 * @param {Function} dispatch
 * @return {XML}
 */
const render = compose(shadow('css/components/list-todos.css'), ({ props, dispatch }) => {

    /**
     * @method setAs
     * @param {Object} model
     * @param {Symbol} status
     * @return {void}
     */
    const setAs = (model, status) => dispatch(setTodo(model.id, status));

    return (
        <list-todos>
            <ul>
                {getTodos(props.todos, setAs)}
            </ul>
        </list-todos>
    )

});

export default stitch({ propTypes, render });

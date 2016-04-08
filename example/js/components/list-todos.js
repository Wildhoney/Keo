import React, { PropTypes } from 'react';
import { compose } from 'ramda';
import { emojify } from 'react-emoji';
import { stitch, shadow } from '../../../src/keo';
import { setTodo, DONE, PROGRESS } from '../actions';

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
 * @param {Function} setAs
 * @return {XML[]}
 */
const getTodos = (collection, filterBy, setAs) => {

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
                   onClick={() => setAs(model, model.status === DONE ? PROGRESS : DONE)}>
                    {emojify(model.text)}
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
                {getTodos(props.todos, props.params.status, setAs)}
            </ul>
        </list-todos>
    )

});

export default stitch({ propTypes, render });

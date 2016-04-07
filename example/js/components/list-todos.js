import React, { PropTypes } from 'react';
import { compose } from 'ramda';
import { stitch, shadow } from '../../../src/keo';

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
 * @return {XML[]}
 */
const getTodos = collection => {

    return collection.map(model => {
        return (
            <li key={model.id} className={model.done ? 'done' : ''}>
                {model.text}
            </li>
        );
    });

};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = compose(shadow('css/components/list-todos.css'), ({ props }) => {

    return (
        <list-todos>
            <ul>
                {getTodos(props.todos)}
            </ul>
        </list-todos>
    )

});

export default stitch({ propTypes, render });

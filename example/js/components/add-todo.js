import React, { PropTypes } from 'react';
import { compose } from 'ramda';
import { stitch, shadow } from '../../../src/keo';
import { setText, addTodo } from '../actions';

/**
 * @constant propTypes
 * @type {Object}
 */
const propTypes = {
    form: PropTypes.shape({
        text: PropTypes.string.isRequired
    })
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = compose(shadow('css/components/add-todo.css'), ({ props, dispatch }) => {

    /**
     * @method submitTodo
     * @param {Object} event
     * @return {void}
     */
    const submitTodo = event => {

        event && event.preventDefault();

        if (props.form.text.length) {
            dispatch(addTodo(props.form.text));
            dispatch(setText(''));
        }
        
    };

    return (
        <add-todo>
            <form onSubmit={submitTodo}>
                <input type="text" placeholder="What needs to be done?" value={props.form.text}
                       onChange={event => dispatch(setText(event.target.value))} />
                <input type="submit" value="" className={props.form.text.length ? 'active' : ''} />
            </form>
        </add-todo>
    )

});

export default stitch({ render, propTypes });

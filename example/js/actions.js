import { SET_TEXT, ADD_TODO, SET_TODO } from './config/events';

/**
 * @constant DONE
 * @type {Symbol}
 */
export const DONE = Symbol('done');

/**
 * @constant PROGRESS
 * @type {Symbol}
 */
export const PROGRESS = Symbol('progress');

/**
 * @method setText
 * @param {String} value
 * @return {Function}
 */
export const setText = value => {
    return dispatch => {
        dispatch({ type: SET_TEXT, value });
    }  
};

/**
 * @method addTodo
 * @param {String} value
 * @return {Function}
 */
export const addTodo = value => {
    return dispatch => {
        dispatch({ type: ADD_TODO, value });
    }  
};

/**
 * @method setTodo
 * @param {Number} id
 * @param {Symbol} status
 * @return {Function}
 */
export const setTodo = (id, status) => {
    return dispatch => {
        dispatch({ type: SET_TODO, id, status });
    }
};

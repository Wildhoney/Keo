import { SET_TEXT, ADD_TODO } from './config/events';

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

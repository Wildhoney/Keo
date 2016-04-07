import 'babel-polyfill';
import { ADD_TODO } from '../config/events';
import Bicycle from 'bi-cycle';

/**
 * @constant INITIAL_STATE
 * @type {Array}
 */
const INITIAL_STATE = [];

/**
 * @constant next
 * @type {Function}
 */
const { next } = Bicycle();

/**
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case ADD_TODO:
            return [ ...state, { id: next(), text: action.value, done: false }];

    }

    return state;

};

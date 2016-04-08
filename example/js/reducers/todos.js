import 'babel-polyfill';
import { ADD_TODO, SET_TODO } from '../config/events';
import { DONE, PROGRESS } from '../actions';
import Bicycle from 'bi-cycle';

/**
 * @constant next
 * @type {Function}
 */
const { next } = Bicycle();

/**
 * @constant INITIAL_STATE
 * @type {Array}
 */
const INITIAL_STATE = [
    { id: next(), text: 'Post application for the Monster Raving Loony Party.', status: PROGRESS },
    { id: next(), text: 'Take Dougal the demanding :cat: for a walk-around the block.', status: PROGRESS },
    { id: next(), text: 'Refactor the decoupled clothes into one large cohesive pile!', status: DONE }
];

/**
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case ADD_TODO:
            
            return [
                ...state,
                { id: next(), text: action.value, status: PROGRESS }
            ];

        case SET_TODO:

            const index = state.findIndex(x => x.id === action.id);

            return [
                ...state.slice(0, index),
                { ...state[index], status: action.status },
                ...state.slice(index + 1)
            ];

    }

    return state;

};

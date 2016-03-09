import { COUNTRIES } from '../config/events';

/**
 * @constant INITIAL_STATE
 * @type {Array}
 */
const INITIAL_STATE = [];

/**
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case COUNTRIES:
            return [ ...state, ...action.collection ];

    }

    return state;

};

import { SET_TEXT } from '../config/events';

/**
 * @constant INITIAL_STATE
 * @type {Object}
 */
const INITIAL_STATE = {
    text: ''
};

/**
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case SET_TEXT:
            return { ...state, text: action.value };

    }

    return state;

};

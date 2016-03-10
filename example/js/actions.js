import { COUNTRIES, COUNTRY, ANSWER } from './config/events';
import shuffle from 'array-shuffle';

/**
 * @method fetchCountries
 * @return {Function}
 */
export const fetchCountries = () => {
    
    return dispatch => {
        fetch('https://restcountries.eu/rest/v1/all')
            .then(response => response.json())
            .then(collection => dispatch({ type: COUNTRIES, collection: collection.filter(x => x.capital).slice(0, 5) }));
    }
    
};

/**
 * @method fetchCountry
 * @return {Function}
 */
export const fetchCountry = () => {

    return (dispatch, getState) => {
        const model = shuffle([ ...getState().countries ])[0];
        dispatch({ type: COUNTRY, model });
    };

};

/**
 * @method setAnswer
 * @param {String} guess
 * @return {Function}
 */
export const setAnswer = guess => {

    return (dispatch, getState) => {
        const { capital, name } = getState().country;
        const isCorrect = guess === capital;
        dispatch({ type: ANSWER, model: { name, capital, isCorrect } });
    };

};

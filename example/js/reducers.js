import { combineReducers } from 'redux';
import country from './reducers/country';
import countries from './reducers/countries';
import answers from './reducers/answers';

export default combineReducers({
    country,
    countries,
    answers
});

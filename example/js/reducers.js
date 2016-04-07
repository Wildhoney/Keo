import { combineReducers } from 'redux';
import form from './reducers/form';
import todos from './reducers/todos';

export default combineReducers({
    form,
    todos
});

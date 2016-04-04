import ready from 'document-ready-promise';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';
import routes from './routes';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ready().then(() => {

    const mountNode = document.querySelector('.todo-app');
    
    render((
        <Provider store={store}>
            {routes}
        </Provider>
    ), mountNode);

});

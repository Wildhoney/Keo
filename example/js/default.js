import ready from 'document-ready-promise';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import reducers from './reducers';
import Layout from './containers/layout';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ready().then(() => {

    const mountNode = document.querySelector('.todo-app');
    const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
    
    render((
        <Provider store={store}>
            <Router history={appHistory}>
                <Route path="/" component={Layout} />
                <Route path="/:status" component={Layout} />
            </Router>
        </Provider>
    ), mountNode);

});

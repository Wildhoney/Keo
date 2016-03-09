import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Layout from './containers/layout';
import Countries from './containers/countries';

export default (
    <Router history={browserHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Countries} />
        </Route>
    </Router>
);

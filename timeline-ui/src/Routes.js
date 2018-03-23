import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from "./components/Login";
import SearchPageContainer from "./containers/Search";

import { userIsAuthenticated, userIsNotAuthenticated } from './utils/auth';

export default ({}) => (
    [
        <Route key="login" exact path="/" component={userIsNotAuthenticated(LoginPage)}></Route>,
        <Route key="search" exact path="/search" component={userIsAuthenticated(SearchPageContainer)}></Route>
    ]
)
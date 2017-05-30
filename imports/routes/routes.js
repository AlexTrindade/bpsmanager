import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Session } from 'meteor/session';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import CustomerItemPage from '../ui/CustomerItemPage';
import CustomerListPage from '../ui/CustomerListPage';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import IndexPage from '../ui/IndexPage';

const onEnterCustomerItemPage = (nextState) => {
  Session.set('selectedCustomerId', nextState.params.id);
};

const onLeaveCustomerItemPage = () => {
  Session.set('selectedCustomerId', undefined);
}

export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
  const isAuthenticatedPage = currentPagePrivacy === 'auth';

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
}

export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
}

export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
}

export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange} >
      <Route path="/" component={Login} privacy="unauth" />
      <Route path="/dashboard" component={Dashboard} privacy="auth">
        <IndexRoute component={IndexPage} privacy="auth" />
        <Route path="/dashboard/customers" component={CustomerListPage} privacy="auth"/>
        <Route path="/dashboard/customers/:id" component={CustomerItemPage} onEnter={onEnterCustomerItemPage} onLeave={onLeaveCustomerItemPage} privacy="auth"/>
        <Route path="/dashboard/signup" component={Signup} privacy="unauth" />
      </Route>
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

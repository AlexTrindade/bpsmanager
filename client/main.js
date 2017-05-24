import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

import {onAuthChange, routes} from '../imports/routes/routes';
import '../imports/startup/simpl-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');
  onAuthChange(isAuthenticated, currentPagePrivacy);
});

Tracker.autorun(() => {
  const selectedCustomerId = Session.get('selectedCustomerId');
  if (selectedCustomerId) {
    browserHistory.push(`/dashboard/customers/${selectedCustomerId}`);
  }
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
  Session.set('filterCustomer', undefined);
});

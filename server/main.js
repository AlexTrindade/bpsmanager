import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import '../imports/api/customers';
import {Transactions} from '../imports/api/transactions';
import '../imports/startup/simpl-schema-configuration.js';

Meteor.startup(() => {

});

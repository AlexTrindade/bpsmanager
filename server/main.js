import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import {Customers} from '../imports/api/customers';
import {Transactions} from '../imports/api/transactions';
import '../imports/startup/simpl-schema-configuration.js';

Meteor.startup(() => {
  // Example to use in future api for ios
  WebApp.connectHandlers.use('/customer', (req, res, next) => {
    const name = req.url.slice(1);
    res.writeHead(200);
    res.end(`Hello world from: ${Meteor.release} - ${name}`);
  });
});

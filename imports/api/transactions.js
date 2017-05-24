import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';
import {Session} from 'meteor/session';

export const Transactions = new Mongo.Collection('transactions');

if (Meteor.isServer) {

  Meteor.publish('transactions', function(customerId) {
    return Transactions.find({customerId});
  });

}

Meteor.methods({
  'transaction.insert'(customerId, service, value) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      customerId: {
        type: String,
        label: 'Name',
        min: 5
      },
      service: {
        type: String,
        label: 'Name',
        min: 5
      },
      value: {
        type: Number,
        label: 'Value'
      }
    }).validate({ customerId, service, value });

    return Transactions.insert({
      customerId,
      service,
      value
    })
  },
  'transaction.sum'(customerId) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      customerId: {
        type: String,
        label: 'Name',
        min: 5
      }
    }).validate({customerId});

    return Transactions.aggregate([
      {$match: {customerId}},
      {$group: {
        _id: '$customerId',
        totalAmount: { $sum: "$value" },
      }}
    ]);
  }

});

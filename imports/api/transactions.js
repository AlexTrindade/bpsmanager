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

  Meteor.publish('transactionsSum', function(customerId) {
    return Transactions.find({});
  });
}

Meteor.methods({
  'transaction.insert'(customerId, accountId, description, value, date, category, note ) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      customerId: {
        type: String,
        label: 'Name',
        min: 5
      },
      accountId: {
        type: String,
        label: 'AccountId',
        min: 3
      },
      description: {
        type: String,
        label: 'Description',
        min: 3
      },
      value: {
        type: Number,
        label: 'Value'
      },
      date: {
        type: Number,
        label: 'Date'
      },
      category: {
        type: String,
        label: 'Category',
        min: 5
      },
      note: {
        type: String,
        label: 'Note',
        optional: true
      }
    }).validate({ customerId, accountId, description, value, date, category, note });

    return Transactions.insert({
      customerId,
      accountId,
      description,
      value,
      date,
      category,
      note,
      userId: this.userId,
      updateAt: moment().valueOf()
    })
  },
  'transaction.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      description: {
        type: String,
        label: 'Description',
        min: 3
      },
      value: {
        type: Number,
        label: 'Value'
      },
      date: {
        type: Number,
        label: 'Date'
      },
      category: {
        type: String,
        label: 'Category',
        min: 5
      },
      note: {
        type: String,
        label: 'Note',
        optional: true
      }
    }).validate({ _id, ...updates });

    return Transactions.update({
      _id,
      userId: this.userId
    }, {
      $set: {
        ...updates,
        updateAt: moment().valueOf()
      }
    });
  }

});

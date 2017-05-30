import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Customers = new Mongo.Collection('customers');

if (Meteor.isServer) {
  Meteor.publish('customers', function() {
    // return Customers.find({userId: this.userId});
    return Customers.find({});
  });
}

Meteor.methods({
  'customer.insert'(name, website, email, phone) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    new SimpleSchema({
      name: {
        type: String,
        label: 'Name',
        min: 5
      },
      website: {
        type: String,
        optional: true,
        label: 'Website',
        regEx: SimpleSchema.RegEx.Domain
      },
      email: {
        type: String,
        optional: true,
        label: 'Email',
        regEx: SimpleSchema.RegEx.Email
      },
      phone: {
        type: String,
        optional: true,
        label: 'Phone',
        regEx: SimpleSchema.RegEx.Phone
      }
    }).validate({ name, website, email, phone });

    return Customers.insert({
      name,
      website,
      email,
      phone,
      userId: this.userId,
      updateAt: moment().valueOf()
    })
  },
  'customer.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      name: {
        type: String,
        label: 'Name',
        min: 5
      },
      website: {
        type: String,
        optional: true,
        label: 'Website',
        regEx: SimpleSchema.RegEx.Url
      },
      email: {
        type: String,
        optional: true,
        label: 'Email',
        regEx: SimpleSchema.RegEx.Email
      },
      phone: {
        type: String,
        optional: true,
        label: 'Phone',
        regEx: SimpleSchema.RegEx.Phone
      }
    }).validate({ _id, ...updates });

    return Customers.update({
      _id,
      userId: this.userId
    }, {
      $set: {
        ...updates,
        updateAt: moment().valueOf()
      }
    })
  }
});

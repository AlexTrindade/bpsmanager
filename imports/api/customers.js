import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Customers = new Mongo.Collection('customers');

if (Meteor.isServer) {
  Meteor.publish('customers', function() {
    return Customers.find({userId: this.userId});
  });
}

Meteor.methods({
  'customer.insert'(name, website, address, phone) {
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
        label: 'Website',
        min: 5,
        // regEx: SimpleSchema.RegEx.Url
      },
      address: {
        type: String,
        label: 'Address',
        min: 5
      },
      phone: {
        type: String,
        label: 'Phone',
        min: 5
      }
    }).validate({ name, website, address, phone });

    return Customers.insert({
      name,
      website,
      address,
      phone,
      userId: this.userId,
      updateAt: moment().valueOf()
    })
  }
});

import React from 'react';
import {Session} from 'meteor/session';
import {createContainer} from 'meteor/react-meteor-data';

import {Transactions} from '../api/transactions';

export class CustomerItem extends React.Component {
  render() {
    let sum = 0;
    this.props.transactions.map((transaction) => {
      if (transaction.customerId == this.props._id) {
        sum += transaction.value;
      }
    });
    return (
      <div className="customer-item" onClick={() => {
        Session.set('selectedCustomerId', this.props._id);
      }}>
        <div className="name-web">
          <span>{this.props.name}</span>
          <div>{this.props.website}</div>
        </div>
        <div className="email-phone-value">
          <div>{this.props.email}</div>
          <div>{this.props.phone}</div>
          <div>Saldo a receber: <span className="value">{sum.toFixed(2)}</span></div>
        </div>
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('transactionsSum');
  return {
   transactions: Transactions.find({}).fetch()
  }
}, CustomerItem);

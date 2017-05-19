import React from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import {Customers} from '../api/customers';

export class CustomerItemPage extends React.Component {
  render() {
    if (this.props.customer) {
      return (
        <div>
          <div className="customer-header">
            <h1>Customer Item Page</h1>
          </div>
          {this.props.customer.name}
          <br />
          {this.props.customer.website}
        </div>
      );
    } else {
      return (
        <div className="customer-header">
          <h1>No Customer finded!</h1>
        </div>
      )
    }
  }
}

export default createContainer(() => {
  Meteor.subscribe('customers');
  let selectedCustomerId = Session.get('selectedCustomerId');
  return {
    selectedCustomerId,
    customer: Customers.findOne(selectedCustomerId)
  }
}, CustomerItemPage);

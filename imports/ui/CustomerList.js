import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import moment from 'moment';

import {Customers} from '../api/customers';
import CustomerItem from './CustomerItem';

export default class CustomerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: []
    };
  }
  componentDidMount() {
    this.customersTracker = Tracker.autorun(() => {
      Meteor.subscribe('customers');

      const filter = Session.get('filterCustomer');
      if (filter) {
        const customers = Customers.find({
          'name': {$regex: filter, $options: 'i'}
        }, {
        sort: {
          updateAt: -1
        }
        }).fetch();
        this.setState({ customers });
      } else {
        const customers = Customers.find({}, {
        sort: {
          updateAt: -1
        }
        }).fetch();
        this.setState({ customers });
      }
    });
  }
  componentWillUnmount() {
    this.customersTracker.stop();
  }
  renderCustomersListItems() {
    if (this.state.customers.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No Customer Found</p>
        </div>
      );
    }
    return this.state.customers.map((customer) => {
      return (
        <CustomerItem key={customer._id} {...customer} />
      );
    });
  }
  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderCustomersListItems()}
        </FlipMove>
      </div>
    )
  }
}

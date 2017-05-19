import React from 'react';
import {Session} from 'meteor/session';

export default class CustomerItem extends React.Component {
  render() {
    return (
      <div className="customer-item" onClick={() => {
        Session.set('selectedCustomerId', this.props._id);
      }}>
        <div className="name">
          {this.props.name}
        </div>
        <div className="website">
          {this.props.website}
        </div>
        <div className="address">
          {this.props.address}
        </div>
        <div className="phone">
          {this.props.phone}
        </div>
      </div>
    )
  }
}

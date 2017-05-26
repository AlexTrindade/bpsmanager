import React from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import Modal from 'react-modal';

import {Customers} from '../api/customers';
import {Transactions} from '../api/transactions';

import TransactionAdd from './TransactionAdd';
import TransactionList from './TransactionList';

export class CustomerItemPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      error: '',
      name: '',
      website: '',
      email: '',
      phone: '',
      soma: 0
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.name == '' && this.props.customer) {
      this.setState({
        name: this.props.customer.name,
        website: this.props.customer.website,
        email: this.props.customer.email,
        phone: this.props.customer.phone
      })
    }
  }
  handleModalClose() {
    this.setState({
      isOpen: false,
      error: ''
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const name = this.state.name;
    const website = this.state.website;
    const phone = this.state.phone;
    const email = this.state.email;
    Meteor.call('customer.update', this.props.customer._id, {name, website, phone, email}, (err, res) => {
      if (err) {
        this.setState({
          error: err.reason
        })
      } else {
        this.setState({
          isOpen: false
        })
      }
    });
  }
  handleNameChange(e) {
    const name = e.target.value;
    this.setState({ name });
  }
  handleWebsiteChange(e) {
    const website = e.target.value;
    this.setState({ website });
  }
  handleEmailChange(e) {
    const email = e.target.value;
    this.setState({ email });
  }
  handlePhoneChange(e) {
    const phone = e.target.value;
    this.setState({ phone });
  }
  render() {
    if (this.props.customer) {
      return (
        <div>
          <div className="customer-header">
            <div>
              <h1>{this.props.customer.name}</h1>
            </div>
            <div>
              {this.props.customer.email}
              <br />
              {this.props.customer.website}
              <br />
              {this.props.customer.phone}
              <br />
              <div>
                <button className="button" onClick={() => this.setState({isOpen: true})}>Edit Customer</button>
                <Modal
                  isOpen={this.state.isOpen}
                  contentLabel="Add customer"
                  onRequestClose={this.handleModalClose.bind(this)}
                  className="boxed-view__box--customer"
                  overlayClassName="boxed-view boxed-view--modal">
                  <h1>Add Customer</h1>
                  {this.state.error ? <p>{this.state.error}</p> : undefined}
                  <form onSubmit={this.handleSubmit.bind(this)} className="boxed-view__form">
                    <input type="text" placeholder="Customer name" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
                    <input type="text" placeholder="Website" value={this.state.website} onChange={this.handleWebsiteChange.bind(this)}/>
                    <input type="text" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange.bind(this)}/>
                    <input type="text" placeholder="Phone" value={this.state.phone} onChange={this.handlePhoneChange.bind(this)}/>
                    <button className="button">Edit Customer</button>

                  </form>
                  <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
                </Modal>
              </div>
            </div>
          </div>

          <div className="customer-commands">
            <TransactionAdd />

          </div>

          <div>
            <TransactionList />
          </div>
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

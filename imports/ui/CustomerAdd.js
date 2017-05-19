import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import Modal from 'react-modal';
import {Session} from 'meteor/session';

export default class CustomerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      error: ''
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const name = this.refs.name.value;
    const website = this.refs.website.value;
    const address = this.refs.address.value;
    const phone = this.refs.phone.value;
    Meteor.call('customers.insert', name, website, address, phone, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });
  }
  handleModalClose() {
    this.setState({
      isOpen: false,
      error: ''
    });
  }
  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({isOpen: true})}>New Customer</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add link"
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box--customer"
          overlayClassName="boxed-view boxed-view--modal">
          <h1>Add Customer</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.handleSubmit.bind(this)} className="boxed-view__form">
            <input type="text" placeholder="Customer name" ref="name" />
            <input type="text" placeholder="Website" ref="website" />
            <input type="text" placeholder="Address" ref="address" />
            <input type="text" placeholder="Phone" ref="phone" />
            <button className="button">Add Customer</button>
            <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
          </form>
        </Modal>
      </div>
    )
  }
}

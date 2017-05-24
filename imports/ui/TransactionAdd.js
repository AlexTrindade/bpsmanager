import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import Modal from 'react-modal';
import {Session} from 'meteor/session';

export default class TransactionAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      error: ''
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    let selectedCustomerId = Session.get('selectedCustomerId');
    const value = parseFloat(this.refs.value.value);
    const service = this.refs.service.value;
    Meteor.call('transaction.insert', selectedCustomerId, service, value, (err, res) => {
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
        <button className="button" onClick={() => this.setState({isOpen: true})}>New Transaction</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add transaction"
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box--customer"
          overlayClassName="boxed-view boxed-view--modal">
          <h1>Add Customer</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.handleSubmit.bind(this)} className="boxed-view__form">
            <input type="text" placeholder="Service/Product" ref="service" />
            <input type="text" placeholder="Value" ref="value" />
            <button className="button">Add Transaction</button>
            <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
          </form>
        </Modal>
      </div>
    )
  }
}

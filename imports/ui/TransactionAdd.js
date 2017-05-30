import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import Modal from 'react-modal';
import {Session} from 'meteor/session';
import moment from 'moment';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

export default class TransactionAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      error: '',
      date: moment(),
      focusedInput: null
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    let selectedCustomerId = Session.get('selectedCustomerId');
    const value = parseFloat(this.refs.value.value);
    const description = this.refs.description.value;
    const category = this.refs.category.value;
    const note = this.refs.note.value;
    const date = this.state.date.valueOf()
    Meteor.call('transaction.insert', selectedCustomerId, 'cash', description, value, date, category, note, (err, res) => {
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
  handleValidateInputValue(e) {
    const value = e.target.value;
    if (value.match(/[^0-9.0-9]/)) {
      this.setState({
        error: 'Only numbers are accepted'
      })
    } else {
      this.setState({
        error: ''
      })
    }
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
          <h1>Add Transaction</h1>
          <div className="error">{this.state.error ? <p>{this.state.error}</p> : undefined}</div>
          <form onSubmit={this.handleSubmit.bind(this)} className="boxed-view__form">
            <div className="date-picker-alx">
              <div>
                Date:
              </div>
              <SingleDatePicker
                numberOfMonths={2}
                date={this.state.date} // momentPropTypes.momentObj or null
                onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                focused={this.state.focused} // PropTypes.bool
                onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
              />
            </div>
            <input type="hidden" placeholder="Date" ref="date" value={this.state.date.valueOf()}/>
            <label htmlFor="description">Description</label>
            <input type="text" ref="description" id="description" placeholder="Service/product"/>
            <label htmlFor="value">Value</label>
            <input type="text" placeholder="0.00" ref="value" onChange={this.handleValidateInputValue.bind(this)} id="value"/>
            <label htmlFor="categoru">Category</label>
            <select ref="category" id="category">
              <option value="website">Website</option>
              <option value="renew">Renew Website</option>
            </select>
            <label htmlFor="note">Note</label>
            <textarea ref="note" id="" cols="30" rows="10" placeholder="Observations" id="note"></textarea>
            <button className="button" disabled={this.state.error == 'Only numbers are accepted'}>Add Transaction</button>
            <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
          </form>
        </Modal>
      </div>
    )
  }
}

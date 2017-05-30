import React from 'react';
import Modal from 'react-modal';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import moment from 'moment';

export default class TransactionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      error: ''
    }
  }
  handleClick() {
    this.setState({
      isOpen: true
    })
  }
  componentDidUpdate() {
    if (this.state.value === '' && this.props.transaction) {
      this.setState({
        ...this.props.transaction,
        date: moment(this.props.transaction.date)
      })

    }
  }
  componentDidMount() {
    this.setState({
      ...this.props.transaction,
      date: moment(this.props.transaction.date)
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    const description = this.state.description;
    const value = Number(this.state.value);
    const category = this.state.category;
    const note = this.state.note;
    const date = this.state.date.valueOf();

    Meteor.call('transaction.update', this.props.transaction._id, {description, value, date, category, note}, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          isOpen: false
        })
      }
    })

  }
  handleModalClose() {
    this.setState({
      isOpen: false,
      error: ''
    });
  }
  handleChangeValue(e) {
    const value = e.target.value;
    if (value.match(/[^0-9.0-9]/)) {
      this.setState({
        error: 'Only numbers are accepted',
        value
      })
    } else {
      this.setState({
        error: '',
        value
      })
    }
  }
  handleDescriptionChange(e) {
    const description = e.target.value;
    this.setState({
      description
    })
  }
  handleCategoryChange(e) {
    const category = e.target.value;
    this.setState({
      category
    })
  }
  handleNoteChange(e) {
    const note = e.target.value;
    this.setState({
      note
    })
  }
  render() {
    const value = this.props.transaction.value.toFixed(2);
    return (
      <div className="transaction">
        <div className="data">
          {this.props.transaction.description}
          <br/>
          Date: {moment(this.state.date).format('MM/DD/Y')}
          <br/>
          Category: {this.props.transaction.category}
          <br/>
          Note: {this.props.transaction.note}
        </div>
        <div className="value">
          <span className={this.props.transaction.value > 0 ? 'positive' : 'negative'}>U$ {value}</span><br/>
        </div>
        <div className="buttons">
          <button onClick={this.handleClick.bind(this)}>Edit</button>
          <Modal
            isOpen={this.state.isOpen}
            contentLabel="Edit transaction"
            onRequestClose={this.handleModalClose.bind(this)}
            className="boxed-view__box--customer"
            overlayClassName="boxed-view boxed-view--modal">
            <h1>Edit transaction</h1>
            <div className="error">{this.state.error ? <p>{this.state.error}</p> : undefined}</div>
            <form onSubmit={this.handleSubmit.bind(this)} className="boxed-view__form">
              <div className="date-picker-alx">
                <div>
                  Date:
                </div>
                <SingleDatePicker
                  date={this.state.date} // momentPropTypes.momentObj or null
                  onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                  focused={this.state.focused} // PropTypes.bool
                  onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                />
              </div>
              <input type="hidden" placeholder="Date" ref="date" value={this.state.date}/>
              <input type="text" placeholder="Description" value={this.state.description} onChange={this.handleDescriptionChange.bind(this)}/>
              <input type="text" placeholder="Value" value={this.state.value} onChange={this.handleChangeValue.bind(this)}/>
              <select value={this.state.category} onChange={this.handleCategoryChange.bind(this)}>
                <option value="website">Website</option>
                <option value="renew" >Renew Website</option>
              </select>
              <textarea ref="note" id="" cols="30" rows="10" value={this.state.note} onChange={this.handleNoteChange.bind(this)}></textarea>
              <button className="button" disabled={this.state.error == 'Only numbers are accepted'}>Edit Transaction</button>
              <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
            </form>

          </Modal>
        </div>
      </div>
    )
  }
}

import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';

import {Transactions} from '../api/transactions';
import TransactionItem from './TransactionItem';

export class TransactionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: 0
    }
  }
  renderTransactions() {
    let sumValue = 0;
    let transactions = [];
    transactions = this.props.transactions.map((transaction) => {
      sumValue += transaction.value;
      return <TransactionItem transaction={transaction} key={transaction._id}/>
    });
    return (
      <div className="transactions">
        {transactions}
        <div className="transaction--sum">
          Sum: {sumValue.toFixed(2)}
        </div>

      </div>

    )
  }

  render() {
    console.log();
    return (
      <div>
        {this.renderTransactions()}
      </div>
    )
  }
}

export default createContainer(() => {
  let selectedCustomerId = Session.get('selectedCustomerId');
  Meteor.subscribe('transactions', selectedCustomerId);
  return {
    selectedCustomerId,
    transactions: Transactions.find({customerId: selectedCustomerId}).fetch()
  }
}, TransactionList);

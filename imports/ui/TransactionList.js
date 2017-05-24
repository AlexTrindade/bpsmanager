import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';

import {Transactions} from '../api/transactions';

export class TransactionList extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   sum: 0
    // }
  }
  renderTransactions() {
    return this.props.transactions.map((transaction) => {
      const value = transaction.value.toFixed(2);
      return (
        <div key={transaction._id}>
          {transaction.service} - {value}
        </div>
      )
    });
  }
  componentWillUpdate() {
    console.log('componentWillUpdate run');
    let selectedCustomerId = Session.get('selectedCustomerId');
    Meteor.call('transaction.sum', selectedCustomerId, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res[0].totalAmount);
      }
    });
  }

  // componentDidMount() {
  //   let selectedCustomerId = Session.get('selectedCustomerId');
    // let soma = Meteor.call('transaction.sum', selectedCustomerId);
    // let soma = Transactions.aggregate([
    //   {$match: {selectedCustomerId}},
    //   {$group: {
    //     _id: '$customerId',
    //     totalAmount: { $sum: "$value" },
    //   }}
    // ]);
    // console.log(soma);
  // }

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
  Meteor.subscribe('transactionsSum', selectedCustomerId);

  return {
    selectedCustomerId,
    transactions: Transactions.find({customerId: selectedCustomerId}).fetch()
  }
}, TransactionList);

import React from 'react';

export default class CustomerFilter extends React.Component {
  handleChange(e) {
    Session.set('filterCustomer', e.target.value);
  }
  render() {
    return (
      <form>
        <input type="text" placeholder="Filter customer" onChange={this.handleChange.bind(this)}/>
      </form>
    )
  }
}

import React from 'react';

import PrivateHeader from './PrivateHeader';

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <PrivateHeader title="BPS Manager"/>
        <div className="page-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

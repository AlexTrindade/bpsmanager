import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <div className="header__menu">
          <Link to={'/dashboard/customers'} className='button button--link-text'>Customers</Link>
          <a className="button button--link-text" onClick={() => Accounts.logout()}>Logout</a>
        </div>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default PrivateHeader;

import React from 'react';

import CustomerList from './CustomerList';
import CustomerAdd from './CustomerAdd';
import CustomerFilter from './CustomerFilter';

export default () => {
    return (
      <div>
        <div className="customer-header">
          <CustomerAdd />
          <CustomerFilter />
        </div>
        <CustomerList />
      </div>
    );
}

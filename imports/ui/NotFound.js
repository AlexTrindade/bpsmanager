import React from 'react';
import {Link} from 'react-router';

export default class NotFound extends React.Component {
  render()  {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>404 - Page Not Found</h1>
          <p>Humm, you are unable to find that page.</p>
          <Link to="/" className="button button--link">HEAD HOME</Link>
        </div>
      </div>
    );
  }
}

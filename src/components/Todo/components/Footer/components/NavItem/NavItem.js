import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const NavItem = ({ location, route, children }) => {
  const className = location.pathname === route ? 'selected' : '';

  return (
    <Link className={className} to={route}>
      {children}
    </Link>
  );
};

export default withRouter(NavItem);

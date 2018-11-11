import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const NavItem = ({ location, route, children }) => {
  function getClassName(route) {
    return location.pathname === route ? 'selected' : '';
  }

  return (
    <Link className={getClassName(route)} to={route}>
      {children}
    </Link>
  );
};

export default withRouter(NavItem);

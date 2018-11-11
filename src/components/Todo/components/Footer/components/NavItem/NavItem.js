import PropTypes from 'prop-types';
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

NavItem.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  route: PropTypes.string.isRequired,
};

export default withRouter(NavItem);

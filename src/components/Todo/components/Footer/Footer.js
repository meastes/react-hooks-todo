import React from 'react';
import * as RouteConstants from '../../../../constants/Route';
import NavItem from './components/NavItem';

const Footer = ({ totalItems, itemsLeft, onRemoveCompleted }) => {
  const itemText = itemsLeft === 1 ? 'item' : 'items';

  return (
    <>
      <span className="todo-count">
        <strong>{itemsLeft}</strong> {itemText} left
      </span>
      <ul className="filters">
        <li>
          <NavItem route={RouteConstants.Index}>All</NavItem>
        </li>
        <li>
          <NavItem route={RouteConstants.Active}>Active</NavItem>
        </li>
        <li>
          <NavItem route={RouteConstants.Completed}>Completed</NavItem>
        </li>
      </ul>
      {itemsLeft < totalItems && (
        <button className="clear-completed" onClick={onRemoveCompleted}>
          Clear completed
        </button>
      )}
    </>
  );
};

export default Footer;

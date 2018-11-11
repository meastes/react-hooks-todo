import React from 'react';

export default ({ totalItems, itemsLeft, onRemoveCompleted }) => {
  let itemText = 'items';
  if (itemsLeft === 1) {
    itemText = 'item';
  }

  return (
    <>
      <span className="todo-count">
        <strong>{itemsLeft}</strong> {itemText} left
      </span>
      <ul className="filters">
        <li>
          <a className="selected" href="#/">
            All
          </a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
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

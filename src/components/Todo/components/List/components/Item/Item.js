import PropTypes from 'prop-types';
import React from 'react';

const Item = ({ children, completed, editing, onToggle, onRemove }) => {
  let className = '';
  if (completed) {
    className = 'completed';
  } else if (editing) {
    className = 'editing';
  }

  return (
    <li className={className}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={onToggle} />
        <label>{children}</label>
        <button className="destroy" onClick={onRemove} />
      </div>
      <input className="edit" defaultValue="Create a TodoMVC template" />
    </li>
  );
};

Item.propTypes = {
  completed: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Item;

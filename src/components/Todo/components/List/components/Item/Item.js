import React from 'react';

export default ({ description, completed, editing, onToggle, onRemove }) => {
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
        <label>{description}</label>
        <button className="destroy" onClick={onRemove} />
      </div>
      <input className="edit" defaultValue="Create a TodoMVC template" />
    </li>
  );
};

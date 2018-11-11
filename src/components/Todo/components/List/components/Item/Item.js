import React from 'react';

export default ({ description, completed, editing }) => {
  let className = '';
  if (completed) {
    className = 'completed';
  } else if (editing) {
    className = 'editing';
  }

  return (
    <li className={className}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} />
        <label>{description}</label>
        <button className="destroy" />
      </div>
      <input className="edit" value="Create a TodoMVC template" />
    </li>
  );
};

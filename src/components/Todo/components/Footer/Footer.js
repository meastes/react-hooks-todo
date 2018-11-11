import React from 'react';

export default () => (
  <>
    <span className="todo-count">
      <strong>0</strong> item left
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
    {/* Hidden if no completed items are left ↓ */}
    <button className="clear-completed">Clear completed</button>
  </>
);
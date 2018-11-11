import React from 'react';
import Item from './components/Item';

export default ({ todos }) => (
  <div>
    <input id="toggle-all" className="toggle-all" type="checkbox" />
    <label for="toggle-all">Mark all as complete</label>
    <ul className="todo-list">
      {todos.map(({ description, completed }) => (
        <Item description={description} completed={completed} />
      ))}
    </ul>
  </div>
);

import React from 'react';
import Item from './components/Item';
import ToggleAll from './components/ToggleAll';

export default ({ todos }) => (
  <div>
    <ToggleAll />
    <ul className="todo-list">
      {todos.map(({ description, completed }) => (
        <Item description={description} completed={completed} />
      ))}
    </ul>
  </div>
);

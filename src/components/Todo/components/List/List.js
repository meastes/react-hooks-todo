import React from 'react';
import Item from './components/Item';
import ToggleAll from './components/ToggleAll';

export default ({ todos, onTodoToggle }) => (
  <div>
    <ToggleAll />
    <ul className="todo-list">
      {todos.map(({ id, description, completed }) => {
        const onToggle = () => onTodoToggle(id);
        return <Item description={description} completed={completed} onToggle={onToggle} />;
      })}
    </ul>
  </div>
);

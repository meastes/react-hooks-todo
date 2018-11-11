import React from 'react';
import Item from './components/Item';
import ToggleAll from './components/ToggleAll';

export default ({ todos, isAllCompleted, onToggleTodo, onToggleAll, onRemoveTodo }) => (
  <div>
    <ToggleAll isAllCompleted={isAllCompleted} onToggleAll={onToggleAll} />
    <ul className="todo-list">
      {todos.map(({ id, description, completed }) => {
        const onToggle = () => onToggleTodo(id);
        const onRemove = () => onRemoveTodo(id);
        return (
          <Item
            key={id}
            description={description}
            completed={completed}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        );
      })}
    </ul>
  </div>
);

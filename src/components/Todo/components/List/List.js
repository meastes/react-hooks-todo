import PropTypes from 'prop-types';
import React from 'react';
import Item from './components/Item';
import ToggleAll from './components/ToggleAll';

const List = ({ todos, isAllCompleted, onToggleTodo, onToggleAll, onRemoveTodo }) => (
  <div>
    <ToggleAll isAllCompleted={isAllCompleted} onToggleAll={onToggleAll} />
    <ul className="todo-list">
      {todos.map(({ id, description, completed }) => {
        const onToggle = () => onToggleTodo(id);
        const onRemove = () => onRemoveTodo(id);
        return (
          <Item
            key={id}
            completed={completed}
            editing={false} // TODO
            onToggle={onToggle}
            onRemove={onRemove}
          >
            {description}
          </Item>
        );
      })}
    </ul>
  </div>
);

List.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  isAllCompleted: PropTypes.bool.isRequired,
  onToggleTodo: PropTypes.func.isRequired,
  onToggleAll: PropTypes.func.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default List;

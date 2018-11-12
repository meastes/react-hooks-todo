import PropTypes from 'prop-types';
import React from 'react';
import { useEditMode } from './hooks';

const Item = ({ children, completed, onToggle, onRemove, onUpdate }) => {
  const {
    editing,
    updatedDescription,
    handleUpdateDescription,
    handleDoubleClick,
    handleBlur,
    handleKeypress,
  } = useEditMode(children, onUpdate);

  let className = '';
  if (editing) {
    className = 'editing';
  } else if (completed) {
    className = 'completed';
  }

  return (
    <li className={className}>
      {!editing && (
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={onToggle} />
          <label onDoubleClick={handleDoubleClick}>{children}</label>
          <button className="destroy" onClick={onRemove} />
        </div>
      )}
      {editing && (
        <input
          className="edit"
          value={updatedDescription}
          onChange={handleUpdateDescription}
          onKeyPress={handleKeypress}
          onBlur={handleBlur}
          autoFocus
        />
      )}
    </li>
  );
};

Item.propTypes = {
  completed: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Item;

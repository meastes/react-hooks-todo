import PropTypes from 'prop-types';
import React, { useState } from 'react';

const Item = ({ children, completed, onToggle, onRemove, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState(children);

  function handleUpdateDescription(event) {
    setUpdatedDescription(event.currentTarget.value);
  }

  function handleDoubleClick() {
    setEditing(true);
  }

  function handleBlur() {
    onUpdate(this.state.updatedDescription);
    setEditing(false);
  }

  function handleKeypress(event) {
    if (event.key === 'Enter') {
      onUpdate(updatedDescription);
      setEditing(false);
    }
  }

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

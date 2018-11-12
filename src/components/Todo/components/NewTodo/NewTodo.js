import PropTypes from 'prop-types';
import React, { useState } from 'react';

const NewTodo = ({ onNewTodo }) => {
  const [description, setDescription] = useState('');

  function handleChangeDescription(event) {
    setDescription(event.currentTarget.value);
  }

  function handleKeypress(event) {
    if (event.key === 'Enter') {
      onNewTodo(description);
      setDescription('');
    }
  }

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      value={description}
      onChange={handleChangeDescription}
      onKeyPress={handleKeypress}
      autoFocus
    />
  );
};

NewTodo.propTypes = {
  onNewTodo: PropTypes.func.isRequired,
};

export default NewTodo;

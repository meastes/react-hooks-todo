import { useState } from 'react';

export function useDescription(onNewTodo) {
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

  return { description, handleChangeDescription, handleKeypress };
}

import { useState } from 'react';

export function useEditMode(children, onUpdate) {
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

  return {
    editing,
    updatedDescription,
    handleUpdateDescription,
    handleDoubleClick,
    handleBlur,
    handleKeypress,
  };
}

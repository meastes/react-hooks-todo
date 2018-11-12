import uuid from 'uuid/v4';

export function useAddTodos(todos, setTodos) {
  function handleAddTodo(description) {
    const updatedTodos = { ...todos, [uuid()]: { description, completed: false } };
    setTodos(updatedTodos);
  }

  return { handleAddTodo };
}

export function useUpdateTodos(todos, setTodos) {
  function handleUpdateTodo(id, description) {
    const updatedTodos = { ...todos };
    updatedTodos[id].description = description;

    setTodos(updatedTodos);
  }

  return { handleUpdateTodo };
}

export function useToggleTodos(todos, setTodos, isAllCompleted) {
  function hangleToggleTodo(id) {
    const updatedTodos = { ...todos };
    updatedTodos[id].completed = !todos[id].completed;

    setTodos(updatedTodos);
  }

  function handleToggleAll() {
    const updatedTodos = Object.entries(todos).reduce((newTodos, [id, todo]) => {
      const updatedTodo = { ...todo, completed: !isAllCompleted };
      return { ...newTodos, [id]: updatedTodo };
    }, {});

    setTodos(updatedTodos);
  }

  return { hangleToggleTodo, handleToggleAll };
}

export function useRemoveTodos(todos, setTodos) {
  function handleRemoveTodo(id) {
    const updatedTodos = { ...todos };
    delete updatedTodos[id];

    setTodos(updatedTodos);
  }

  function handleRemoveCompleted() {
    const updatedTodos = Object.entries(todos).reduce((newTodos, [id, todo]) => {
      if (todo.completed) {
        return newTodos;
      }
      return { ...newTodos, [id]: todo };
    }, {});

    setTodos(updatedTodos);
  }

  return { handleRemoveTodo, handleRemoveCompleted };
}

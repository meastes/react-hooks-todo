import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Footer from './components/Footer';
import List from './components/List';
import NewTodo from './components/NewTodo';
import { useAddTodos, useRemoveTodos, useToggleTodos, useUpdateTodos } from './hooks';

const Todo = ({ todos: todosProp, show, onListChange = () => {} }) => {
  const [todos, setTodos] = useState(todosProp);
  const todosToDisplay = getTodosToDisplay(todos, show);
  useEffect(() => {
    onListChange(todos);
  });

  const { handleAddTodo } = useAddTodos(todos, setTodos);
  const { handleUpdateTodo } = useUpdateTodos(todos, setTodos);
  const { hangleToggleTodo, handleToggleAll } = useToggleTodos(
    todos,
    setTodos,
    isAllCompleted(todos),
  );
  const { handleRemoveTodo, handleRemoveCompleted } = useRemoveTodos(todos, setTodos);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTodo onNewTodo={handleAddTodo} />
      </header>
      <main className="main">
        <List
          todos={todosToDisplay}
          isAllCompleted={isAllCompleted(todos)}
          onToggleTodo={hangleToggleTodo}
          onToggleAll={handleToggleAll}
          onRemoveTodo={handleRemoveTodo}
          onUpdateTodo={handleUpdateTodo}
        />
      </main>
      <footer className="footer">
        <Footer
          totalItems={numberTotalItems(todos)}
          itemsLeft={numberItemsLeft(todos)}
          onRemoveCompleted={handleRemoveCompleted}
        />
      </footer>
    </section>
  );
};

function getTodosToDisplay(todos, show) {
  let todosToDisplay = Object.entries(todos).map(([id, todo]) => ({ id, ...todo }));

  if (show) {
    todosToDisplay = todosToDisplay.filter(({ completed }) => {
      if (show === 'active') {
        return !completed;
      } else if (show === 'completed') {
        return completed;
      }
      throw Error(`Invalid show prop: ${show}`);
    });
  }

  return todosToDisplay;
}

function numberTotalItems(todos) {
  return Object.keys(todos).length;
}

function numberCompletedItems(todos) {
  return Object.values(todos).filter(({ completed }) => completed).length;
}

function numberItemsLeft(todos) {
  return numberTotalItems(todos) - numberCompletedItems(todos);
}

function isAllCompleted(todos) {
  return numberTotalItems(todos) === numberCompletedItems(todos);
}

Todo.propTypes = {
  todos: PropTypes.object.isRequired,
  show: PropTypes.oneOf(['active', 'completed']),
  onListChange: PropTypes.func,
};

export default Todo;

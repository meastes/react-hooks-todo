import React from 'react';
import List from './components/List';
import NewTodo from './components/NewTodo';
import Footer from './components/Footer';
import { uniqueId as _uniqueId } from 'lodash';

const DEFAULT_TODOS = [
  { id: _uniqueId(), description: 'Taste JavaScript' },
  { id: _uniqueId(), description: 'Buy a unicorn' },
  { id: _uniqueId(), description: 'World domination' },
];

const DEFAULT_COMPLETED = [DEFAULT_TODOS[0].id];

export default class Todo extends React.Component {
  state = {
    todos: DEFAULT_TODOS,
    completed: DEFAULT_COMPLETED,
  };

  handleAddTodo = (description) => {
    const { todos: originalTodos } = this.state;
    const todos = [...originalTodos, { id: _uniqueId(), description }];
    this.setState({ todos });
  };

  hangleToggleTodo = (id) => {
    const { completed } = this.state;
    const stateChanges = {};

    if (completed.includes(id)) {
      stateChanges.completed = completed.filter((completedId) => id !== completedId);
    } else {
      stateChanges.completed = [...completed, id];
    }

    this.setState(stateChanges);
  };

  handleToggleAll = () => {
    const { todos } = this.state;
    const stateChanges = {};

    if (this.isAllCompleted) {
      stateChanges.completed = [];
    } else {
      stateChanges.completed = todos.map((todo) => todo.id);
    }

    this.setState(stateChanges);
  };

  handleRemoveTodo = (id) => {
    const { todos: originalTodos, completed: originalCompleted } = this.state;
    const todos = originalTodos.filter(({ id: todoId }) => id !== todoId);
    const completed = originalCompleted.filter((completedId) => id !== completedId);
    this.setState({ todos, completed });
  };

  handleRemoveCompleted = () => {
    const { todos: originalTodos, completed } = this.state;
    const todos = originalTodos.filter(({ id }) => !completed.includes(id));
    this.setState({ todos, completed: [] });
  };

  get numberTotalItems() {
    return this.state.todos.length;
  }

  get numberItemsLeft() {
    return this.state.todos.length - this.state.completed.length;
  }

  get isAllCompleted() {
    return this.state.todos.length === this.state.completed.length;
  }

  render() {
    const { todos: originalTodos, completed } = this.state;
    const todos = originalTodos.map((todo) => ({
      ...todo,
      completed: completed.includes(todo.id),
    }));

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo onNewTodo={this.handleAddTodo} />
        </header>
        <main className="main">
          <List
            todos={todos}
            isAllCompleted={this.isAllCompleted}
            onToggleTodo={this.hangleToggleTodo}
            onToggleAll={this.handleToggleAll}
            onRemoveTodo={this.handleRemoveTodo}
          />
        </main>
        <footer className="footer">
          <Footer
            totalItems={this.numberTotalItems}
            itemsLeft={this.numberItemsLeft}
            onRemoveCompleted={this.handleRemoveCompleted}
          />
        </footer>
      </section>
    );
  }
}

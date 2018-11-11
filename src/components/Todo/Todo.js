import { uniqueId as _uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Footer from './components/Footer';
import List from './components/List';
import NewTodo from './components/NewTodo';

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

  static propTypes = {
    show: PropTypes.oneOf(['active', 'completed']),
  };

  handleAddTodo = (description) => {
    const { todos: originalTodos } = this.state;
    const todos = [...originalTodos, { id: _uniqueId(), description }];
    this.setState({ todos });
  };

  handleUpdateTodo = (id, description) => {
    const todos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { id, description };
      }
      return todo;
    });

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
      stateChanges.completed = todos.map(({ id }) => id);
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
    const { show } = this.props;
    const { todos: originalTodos, completed } = this.state;
    let todos = originalTodos.map((todo) => ({
      ...todo,
      completed: completed.includes(todo.id),
    }));
    if (show) {
      todos = todos.filter(({ completed }) => {
        if (show === 'active') {
          return !completed;
        } else if (show === 'completed') {
          return completed;
        }
        throw Error(`Invalid show prop: ${show}`);
      });
    }

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
            onUpdateTodo={this.handleUpdateTodo}
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

import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid/v4';
import Footer from './components/Footer';
import List from './components/List';
import NewTodo from './components/NewTodo';

export default class Todo extends React.Component {
  state = {
    todos: this.props.todos,
  };

  static propTypes = {
    todos: PropTypes.object.isRequired,
    show: PropTypes.oneOf(['active', 'completed']),
    onListChange: PropTypes.func,
  };

  componentDidUpdate() {
    if (this.props.onListChange) {
      this.props.onListChange(this.state.todos);
    }
  }

  handleAddTodo = (description) => {
    const { todos: originalTodos } = this.state;
    const todos = { ...originalTodos, [uuid()]: { description, completed: false } };
    this.setState({ todos });
  };

  handleUpdateTodo = (id, description) => {
    const updatedTodo = { ...this.state.todos[id], description };
    const todos = { ...this.state.todos, [id]: updatedTodo };

    this.setState({ todos });
  };

  hangleToggleTodo = (id) => {
    const updatedTodo = { ...this.state.todos[id], completed: !this.state.todos[id].completed };
    const todos = { ...this.state.todos, [id]: updatedTodo };

    this.setState({ todos });
  };

  handleToggleAll = () => {
    const { todos: originalTodos } = this.state;

    const todos = Object.entries(originalTodos).reduce((newTodos, [id, todo]) => {
      const updatedTodo = { ...todo, completed: !this.isAllCompleted };
      return { ...newTodos, [id]: updatedTodo };
    }, {});

    this.setState({ todos });
  };

  handleRemoveTodo = (id) => {
    const todos = { ...this.state.todos };
    delete todos[id];
    this.setState({ todos });
  };

  handleRemoveCompleted = () => {
    const { todos: originalTodos } = this.state;

    const todos = Object.entries(originalTodos).reduce((newTodos, [id, todo]) => {
      if (todo.completed) {
        return newTodos;
      }
      return { ...newTodos, [id]: todo };
    }, {});

    this.setState({ todos });
  };

  get numberTotalItems() {
    return Object.keys(this.state.todos).length;
  }

  get numberCompletedItems() {
    return Object.values(this.state.todos).filter(({ completed }) => completed).length;
  }

  get numberItemsLeft() {
    return this.numberTotalItems - this.numberCompletedItems;
  }

  get isAllCompleted() {
    return this.numberTotalItems === this.numberCompletedItems;
  }

  render() {
    const { show } = this.props;
    let todos = Object.entries(this.state.todos).map(([id, todo]) => ({ id, ...todo }));

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

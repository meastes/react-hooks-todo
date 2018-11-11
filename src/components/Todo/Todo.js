import React from 'react';
import List from './components/List';
import NewTodo from './components/NewTodo';
import Footer from './components/Footer';

const DEFAULT_TODOS = [
  { id: 0, description: 'Taste JavaScript' },
  { id: 1, description: 'Buy a unicorn' },
  { id: 2, description: 'World domination' },
];

export default class Todo extends React.Component {
  state = {
    todos: DEFAULT_TODOS,
    completed: [0],
  };

  handleTodoToggle = (id) => {
    const { completed } = this.state;
    const stateChanges = {};

    if (completed.includes(id)) {
      stateChanges.completed = completed.filter((completedId) => id !== completedId);
    } else {
      stateChanges.completed = [...completed, id];
    }

    this.setState(stateChanges);
  };

  render() {
    const { todos: originalTodos, completed } = this.state;
    const todos = originalTodos.map((todo) => ({
      ...todo,
      completed: completed.includes(todo.id),
    }));

    return (
      <section className="todoapp">
        <header class="header">
          <h1>todos</h1>
          <NewTodo />
        </header>
        <main className="main">
          <List todos={todos} onTodoToggle={this.handleTodoToggle} />
        </main>
        <footer className="footer">
          <Footer />
        </footer>
      </section>
    );
  }
}

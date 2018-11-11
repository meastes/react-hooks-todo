import React from 'react';
import List from './components/List';
import NewTodo from './components/NewTodo';
import Footer from './components/Footer';

const DEFAULT_TODOS = [
  { description: 'Taste JavaScript', completed: true },
  { description: 'Buy a unicorn', completed: false },
  { description: 'World domination', completed: false },
];

export default class Todo extends React.Component {
  state = {
    todos: DEFAULT_TODOS,
  };

  render() {
    return (
      <section className="todoapp">
        <header class="header">
          <h1>todos</h1>
          <NewTodo />
        </header>
        <main className="main">
          <List todos={this.state.todos} />
        </main>
        <footer className="footer">
          <Footer />
        </footer>
      </section>
    );
  }
}

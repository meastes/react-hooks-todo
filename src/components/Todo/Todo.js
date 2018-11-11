import React from 'react';
import List from './components/List';
import NewTodo from './components/NewTodo';
import Footer from './components/Footer';

export default () => (
  <div className="todoapp">
    <header class="header">
      <h1>todos</h1>
      <NewTodo />
    </header>
    <main className="main">
      <List />
    </main>
    <footer className="footer">
      <Footer />
    </footer>
  </div>
);

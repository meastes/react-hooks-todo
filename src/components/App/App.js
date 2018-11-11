import React from 'react';
import TodoList from '../TodoList';
import 'todomvc-app-css/index.css';

export default () => (
  <div className="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input className="new-todo" placeholder="What needs to be done?" autofocus />
    </header>
    <main className="main">
      <TodoList />
    </main>
    <footer className="footer">
      <span className="todo-count">
        <strong>0</strong> item left
      </span>
      <ul className="filters">
        <li>
          <a className="selected" href="#/">
            All
          </a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>
      {/* Hidden if no completed items are left ↓ */}
      <button className="clear-completed">Clear completed</button>
    </footer>
  </div>
);

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'todomvc-app-css/index.css';
import uuid from 'uuid/v4';
import * as RouteConstants from '../../constants/Route';
import Todo from '../Todo';

const DEFAULT_TODOS = {
  [uuid()]: { description: 'Taste JavaScript', completed: true },
  [uuid()]: { description: 'Buy a unicorn', completed: false },
  [uuid()]: { description: 'World domination', completed: false },
};

function handleListChange(todos) {
  window.localStorage.todos = JSON.stringify(todos);
}

function getTodos() {
  if (window.localStorage.todos) {
    return JSON.parse(window.localStorage.todos);
  }
  return DEFAULT_TODOS;
}

const Index = () => <Todo todos={getTodos()} onListChange={handleListChange} />;
const Active = () => <Todo todos={getTodos()} show="active" onListChange={handleListChange} />;
const Completed = () => (
  <Todo todos={getTodos()} show="completed" onListChange={handleListChange} />
);

export default () => {
  return (
    <Router>
      <div>
        <Route path={RouteConstants.Index} exact component={Index} />
        <Route path={RouteConstants.Active} component={Active} />
        <Route path={RouteConstants.Completed} component={Completed} />
      </div>
    </Router>
  );
};

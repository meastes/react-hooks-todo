import React from 'react';
import 'todomvc-app-css/index.css';
import Todo from '../Todo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as RouteConstants from '../../constants/Route';

const Index = () => <Todo />;
const Active = () => <Todo show="active" />;
const Completed = () => <Todo show="completed" />;

export default () => (
  <Router>
    <div>
      <Route path={RouteConstants.Index} exact component={Index} />
      <Route path={RouteConstants.Active} component={Active} />
      <Route path={RouteConstants.Completed} component={Completed} />
    </div>
  </Router>
);

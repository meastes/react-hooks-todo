import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'todomvc-app-css/index.css';
import * as RouteConstants from '../../constants/Route';
import Todo from '../Todo';

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

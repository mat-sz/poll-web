import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';

import { Router } from './config';
import Status from './components/Status';
import NewPoll from './screens/NewPoll';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Status />
        <Switch>
          <Route path="/">
            <NewPoll />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

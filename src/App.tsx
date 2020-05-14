import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';

import { Router } from './config';
import Status from './components/Status';
import NewPoll from './screens/NewPoll';
import Poll from './screens/Poll';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Status />
        <Switch>
          <Route path="/:shortId">
            <Poll />
          </Route>
          <Route path="/">
            <NewPoll />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

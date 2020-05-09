import React from 'react';
import './App.scss';

import Status from './components/Status';

const App: React.FC = () => {
  return (
    <div className="app">
      <Status />
    </div>
  );
};

export default App;

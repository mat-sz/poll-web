import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { StateType } from '../reducers';
import { title } from '../config';

const Status: React.FC = () => {
  const connected = useSelector((state: StateType) => state.connected);

  return (
    <>
      <Link to="/">
        <h1>{title}</h1>
      </Link>
      {!connected ? <div className="status">Connecting...</div> : null}
    </>
  );
};

export default Status;

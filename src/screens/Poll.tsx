import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { StateType } from '../reducers';
import { subscribeAction } from '../actions/poll';

const Poll: React.FC = () => {
  const dispatch = useDispatch();
  const subscribedPolls = useSelector(
    (state: StateType) => state.subscribedPolls
  );
  const { shortId } = useParams<{ shortId: string }>();

  const poll = subscribedPolls[shortId];

  useEffect(() => {
    if (!(shortId in subscribedPolls)) {
      dispatch(subscribeAction(shortId));
    }
  }, [subscribedPolls, shortId, dispatch]);

  return (
    <section>
      <h2>{poll ? poll.title : 'Loading...'}</h2>
    </section>
  );
};

export default Poll;

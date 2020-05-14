import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { StateType } from '../reducers';
import { subscribeAction, voteAction } from '../actions/poll';
import { AnswerModel } from '../types/Models';

interface PollAnswerProps {
  shortId: string;
  answer: AnswerModel;
}

const PollAnswer: React.FC<PollAnswerProps> = ({ shortId, answer }) => {
  const dispatch = useDispatch();
  const vote = () => dispatch(voteAction(shortId, answer.id));

  return (
    <div>
      <button onClick={vote}>
        {answer.text} ({answer.count})
      </button>
    </div>
  );
};

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
      {poll
        ? poll.answers?.map(answer => (
            <PollAnswer shortId={shortId} answer={answer} key={answer.id} />
          ))
        : null}
    </section>
  );
};

export default Poll;

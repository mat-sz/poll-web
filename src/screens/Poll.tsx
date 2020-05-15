import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { StateType } from '../reducers';
import { subscribeAction, voteAction } from '../actions/poll';
import { AnswerModel } from '../types/Models';

interface PollAnswerProps {
  shortId: string;
  answer: AnswerModel;
  totalVotes: number;
}

const PollAnswer: React.FC<PollAnswerProps> = ({
  shortId,
  answer,
  totalVotes,
}) => {
  const dispatch = useDispatch();
  const vote = () => dispatch(voteAction(shortId, answer.id));

  return (
    <div>
      <button className="vote" onClick={vote}>
        {answer.text} ({answer.count})
        <div
          className="progress"
          style={{
            width: (totalVotes > 0 ? answer.count / totalVotes : 0) * 100 + '%',
          }}
        ></div>
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
  const totalVotes =
    poll?.answers?.reduce((previous, current) => previous + current.count, 0) ||
    0;

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
            <PollAnswer
              shortId={shortId}
              answer={answer}
              key={answer.id}
              totalVotes={totalVotes}
            />
          ))
        : null}
    </section>
  );
};

export default Poll;

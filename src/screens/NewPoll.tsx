import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useHistory } from 'react-router-dom';

import { apiServer } from '../config';
import { PollModel } from '../types/Models';

interface Answer {
  id: string;
  answer: string;
}

interface NewPollAnswerProps {
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
  answer: Answer;
  index: number;
}

const NewPollAnswer: React.FC<NewPollAnswerProps> = ({
  setAnswers,
  answer,
  index,
}) => {
  const updateAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target?.value;
    setAnswers(answers => {
      answers[index] = {
        ...answer,
        answer: value,
      };
      return [...answers];
    });
  };

  return (
    <div>
      <input type="text" value={answer.answer} onChange={updateAnswer} />
    </div>
  );
};

const NewPoll: React.FC = () => {
  const [title, setTitle] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([
    { id: uuid(), answer: '' },
    { id: uuid(), answer: '' },
  ]);
  const history = useHistory();

  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const addAnswer = () => {
    setAnswers(answers => [...answers, { id: uuid(), answer: '' }]);
  };
  const createPoll = async () => {
    const poll = {
      title,
      answers: answers.map(answer => answer.answer),
    };

    const res = await fetch(apiServer + 'v1/poll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(poll),
    });

    const json: PollModel = await res.json();
    history.replace('/' + json.shortId);
  };

  return (
    <section>
      <h2>New poll</h2>
      <div className="newPoll">
        <h3>Title</h3>
        <label>
          <input type="text" onChange={updateTitle} value={title} />
        </label>
        <h3>Answers</h3>
        <div className="answers">
          {answers.map((answer, index) => (
            <NewPollAnswer
              answer={answer}
              index={index}
              setAnswers={setAnswers}
              key={answer.id}
            />
          ))}
        </div>
        <div className="actions">
          <button onClick={addAnswer}>Add answer</button>
          <button onClick={createPoll}>Create poll</button>
        </div>
      </div>
    </section>
  );
};

export default NewPoll;

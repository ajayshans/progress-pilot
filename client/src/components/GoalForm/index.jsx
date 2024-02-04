import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_GOAL } from '../../utils/mutations';
import { QUERY_GOALS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const GoalForm = () => {
  const [goalDescription, setGoalDescription] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addGoal, { error }] = useMutation
  (ADD_GOAL, {
    refetchQueries: [
      QUERY_GOALS,
      'getGoals',
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addGoal({
        variables: {
          goalDescription,
          goalOwner: Auth.getProfile().data.username,
        },
      });

      setGoalDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'goalDescription' && value.length <= 280) {
      setGoalDescription(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>Create your goal below:</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="goalDescription"
                placeholder="Here's a new goal..."
                value={goalDescription}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Goal
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your goals. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default GoalForm;

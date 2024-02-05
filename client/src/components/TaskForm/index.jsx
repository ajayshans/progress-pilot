import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_TASK } from '../../utils/mutations';
import { QUERY_GOALS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const TaskForm = () => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskAssignee, setTaskAssignee] = useState('');
    const [taskComplete, setTaskComplete] = useState('');

  const [addTask, { error }] = useMutation
  (ADD_TASK, {
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
      const { data } = await addTask({
        variables: {
            taskName,
            taskDescription,
            taskAssignee,
            taskComplete,
        },
      });

      setTaskName('');
      setTaskDescription('');
      setTaskAssignee('');
      setTaskComplete('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === 'taskName') {
        setTaskName(inputValue);
    } else if (inputType === 'taskDescription') {
        setTaskDescription(inputValue);
    } else if (inputType === 'taskAssignee') {
        setTaskAssignee(inputValue);
    } else if (inputType === 'taskComplete') {
        setTaskComplete(inputValue)
    }
  };

  return (
    <div>
      <h3>Create your goal below:</h3>

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md bg-black p-5"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-12">
            <label htmlFor="goalName" className="form-label text-light">Task Name:</label>
              <textarea
                name="taskName"
                placeholder="Name your goal (e.g. Project Connect)"
                value={goalName}
                className="form-input w-100"
                style={{ lineHeight: '0.75', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-12">
            <label htmlFor="goalDescription" className="form-label text-light">Goal Description:</label>
              <textarea
                name="goalDescription"
                placeholder="Provide a description for your goal &#10;(e.g. Run Sydney Marathon)"
                value={goalDescription}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-12">
            <label htmlFor="goalReward" className="form-label text-light">Goal Reward:</label>
              <textarea
                name="goalReward"
                placeholder="Set a reward for yourself &#10;(e.g. Fancy dinner with friends)"
                value={goalReward}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-purple mt-3 mb-3 py-3 px-3" type="submit">
                Add to Dashboard
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
          You need to be logged in to create a task. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default TaskForm;

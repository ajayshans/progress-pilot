import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_TASK } from '../../utils/mutations';

import Auth from '../../utils/auth';

const TaskForm = ({ goalId }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskAssignee, setTaskAssignee] = useState('');
    const [taskComplete, setTaskComplete] = useState('');
  

  const [addTask, { error }] = useMutation(ADD_TASK);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addTask({
        variables: {
          goalId,
          taskName,
          taskDescription,
          taskAssignee,
          taskComplete
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
      <h2 className = "px-5 mx-5 mt-5 text-center">Add Tasks</h2>

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md bg-black p-5 mb-5"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-12">
            <label htmlFor="taskName" className="form-label text-white">Task Name:</label>
              <textarea
                name="taskName"
                placeholder="Name your task (e.g. 5km run)"
                value={taskName}
                className="form-input w-100"
                style={{ lineHeight: '0.75', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-12">
            <label htmlFor="taskDescription" className="form-label text-white">Task Description:</label>
              <textarea
                name="taskDescription"
                placeholder="Provide a description for your task &#10;(e.g. Go for a 5km run on Tuesday)"
                value={taskDescription}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-12">
            <label htmlFor="taskAssignee" className="form-label text-white">Task Assignee:</label>
              <textarea
                name="taskAssignee"
                placeholder="Assign this task to a person in your squad"
                value={taskAssignee}
                className="form-input w-100"
                style={{ lineHeight: '0.75', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-12">
            <label htmlFor="taskComplete" className="form-label text-white">Has the task been completed already?</label>
              <select
                name="taskComplete"
                value={taskComplete}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              >
                <option defaultValue>Select Option</option>
                <option value="COMPLETE">Yes</option>
                <option value="IN PROGRESS">No</option>
              </select>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-purple mt-3 mb-3 py-3 px-3" type="submit">
                CREATE
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
          You need to be logged in to add tasks. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default TaskForm;

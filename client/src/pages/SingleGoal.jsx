// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import CommentList from '../components/CommentList';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

import { QUERY_SINGLE_GOAL } from '../utils/queries';

const SingleGoal = () => {
    // Use `useParams()` to retrieve value of the route parameter `:profileId`
    const { goalId } = useParams();
    const { loading, data } = useQuery(QUERY_SINGLE_GOAL, {
        // pass URL parameter
        variables: { goalId: goalId },
      });
    const goal = data?.goal || {};
    if (loading) {
        return <div>Loading...</div>;
      }
    
    return (
        <div>
            <div className="m-5">
            <h4 className="card-header bg-white text-black px-3 py-2 m-0" style={{ border: '1px dotted #1a1a1a' }}>
            {goal.goalName} <br />
            <span style={{ fontSize: '1rem' }}>
                ~ {goal.createdAt}
            </span>
            </h4>
            <div className="bg-black text-white py-4 card-body">
                <blockquote
                className="card-body p-4"
                >
                <h5>{goal.goalDescription}</h5>
                </blockquote>
            </div>

            <div className="my-5">
                <TaskList tasks={goal.tasks} />
            </div>
            <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
                <TaskForm goalId={goal._id} />
            </div>
        </div>
        {/* <div><TaskForm/></div> */}
        </div>
        
    )

};
    
export default SingleGoal;

/*

const SingleThought = () => {
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {thought.thoughtAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this thought on {thought.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {thought.thoughtText}
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={thought.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm thoughtId={thought._id} />
      </div>
    </div>
  );
};

export default SingleThought;

*/
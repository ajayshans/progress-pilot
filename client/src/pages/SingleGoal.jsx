// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import UpdateButton from '../components/UpdateButton';
import DeleteButton from '../components/DeleteButton';
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
                Goal - {goal.goalName} <br />
                <span style={{ fontSize: '1rem' }}>
                    ~ {goal.createdAt}
                </span>
                </h4>
                <div className="bg-black text-white py-4 card-body">
                    <blockquote
                    className="card-body py-5"
                    >
                    <h5>{goal.goalDescription}</h5>
                    <UpdateButton goalId={goal._id} currentGoalDescription={goal.goalDescription} />
                    </blockquote>
                    <Link to={`/goals`}>
                        <DeleteButton goalId={goal._id} />
                    </Link>
                </div>
                <div className="mt-3">
                    <TaskList tasks={goal.tasks} />
                </div>
                <Link className= "btn btn-lg btn-white mb-5 mx-5"  to={`/goals/${goal._id}/tasks`}>
                    ADD NEW TASK
                </Link>
            </div>
        </div>
        
    )

};
    
export default SingleGoal;
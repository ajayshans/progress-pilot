// // Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import CommentList from '../components/CommentList';
import TaskForm from '../components/TaskForm';

import { QUERY_SINGLE_GOAL } from '../utils/queries';
// const { goalId } = useParams();
// console.log(goalId);
const GoalTasks = () => {
    // Use `useParams()` to retrieve value of the route parameter `:profileId`
    const { goalId } = useParams();
    const { loading, data } = useQuery(QUERY_SINGLE_GOAL, {
        // pass URL parameter
        variables: { goalId: goalId },
        });
    const goal = data?.goal || {};

    return (
        <div>
            <div className="mx-3 p-5" style={{ border: '1px dotted #1a1a1a' }}>
                <TaskForm goalId = {goal._id}/>
            </div>
        </div>
        

    )

};
    
export default GoalTasks;
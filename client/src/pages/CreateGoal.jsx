// // Import the `useParams()` hook
// import { useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';

// import CommentList from '../components/CommentList';
// import CommentForm from '../components/CommentForm';

// import { QUERY_SINGLE_THOUGHT } from '../utils/queries';
import GoalForm from '../components/GoalForm';






const CreateGoal = () => {

    return (
        <div className = "p-5">
             <div className = "p-5">
                <GoalForm/>
             </div>
             
        </div>
       
    )

};
    
export default CreateGoal;
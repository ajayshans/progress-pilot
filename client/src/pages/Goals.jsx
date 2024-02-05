import { useQuery } from '@apollo/client';

import GoalList from '../components/GoalList';
import GoalForm from '../components/GoalForm';
import Auth from '../utils/auth';

import { QUERY_GOALS } from '../utils/queries';



const Goals = () => {
    const { loading, data } = useQuery(QUERY_GOALS);
    const goals = data?.goals || [];
    const myGoals = goals.filter(goal => goal.goalOwner === Auth.getProfile().data.username);

    return (
        <main>
            <div className="flex-row justify-center">
                <div className="col-12 col-md-10 mb-3 p-3" style={{ border: '1px dotted #1a1a1a' }}>
                    <GoalForm/>
                </div>
                <div className="col-12 col-md-8 mb-3">
                {loading ? (
                <div>Loading...</div>
                ) : (
                <GoalList
                goals={myGoals}
                title="Your Goal Centre"/>
          )}
                </div>
            </div>
        </main>
    )

};
    
export default Goals;
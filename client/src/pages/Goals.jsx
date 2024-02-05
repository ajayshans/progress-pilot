import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

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
                <div className="col-12 col-md-8 mb-3 mt-3">
                {loading ? (
                <div>Loading...</div>
                ) : (
                  <div className = "flex-column">
                    <h1>{Auth.getProfile().data.username.charAt(0).toUpperCase() + Auth.getProfile().data.username.slice(1)}'s Goal Centre</h1>
                    <Link className="btn btn-lg btn-white mb-5 mt-2" to="/addgoal">
                    ADD NEW GOAL
                    </Link>
                    <GoalList
                    goals={myGoals}
                    title="Existing Goals"/>
                  </div>
                
          )}
                </div>
            </div>
        </main>
    )

};
    
export default Goals;
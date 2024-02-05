// // Import the `useParams()` hook
// import { useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';

// import CommentList from '../components/CommentList';
// import CommentForm from '../components/CommentForm';

// import { QUERY_SINGLE_THOUGHT } from '../utils/queries';
import { useQuery } from '@apollo/client';

import GoalList from '../components/GoalList';
import GoalForm from '../components/GoalForm';
import Auth from '../utils/auth';

import { QUERY_GOALS } from '../utils/queries';



const Goals = () => {
    const { loading, data } = useQuery(QUERY_GOALS, {
      // variables: { goalOwner: Auth.getProfile().data.username}
    });
    const goals = data?.goals || [];
        const myGoals = goals.filter(goal => goal.goalOwner === Auth.getProfile().data.username);
    // } else {
    // const myGoals = goals;
    // };
    // console.log(myGoals);
    // console.log(Auth.getProfile().data.username);
    // console.log(goals[1].goalOwner === Auth.getProfile().data.username);
    // console.log(typeof Auth.getProfile().data.username);
    // const filteredGoals = goals.filter(goal => goal.goalOwner === Auth.getProfile().data.username)
    // console.log(goals[0].goalOwner === Auth.getProfile().data.username);
    // console.log(Auth.getProfile().data.username)
    // console.log(data?.goals.filter(goal => [0].goalOwner)
    // var newGoals = {};

    // for (let i = 0; i < allGoals.length; i++) {
    //   if(allGoals[i].goalOwner === Auth.getProfile().data.username) {
    //     newGoals.push(allGoals[i]);
    //   }
    // };

    // console.log(newGoals)

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

/*
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const goals = data?.goals || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ThoughtForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
*/
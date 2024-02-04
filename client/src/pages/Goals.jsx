// // Import the `useParams()` hook
// import { useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';

// import CommentList from '../components/CommentList';
// import CommentForm from '../components/CommentForm';

// import { QUERY_SINGLE_THOUGHT } from '../utils/queries';
import { useQuery } from '@apollo/client';

import GoalList from '../components/GoalList';
import GoalForm from '../components/GoalForm';

import { QUERY_GOALS } from '../utils/queries';


const Goals = () => {
    const { loading, data } = useQuery(QUERY_GOALS);
    const goals = data?.goals || [];

    return (
        <main>
            <div className="flex-row justify-center">
                <div className="col-12 col-md-10 mb-3 p-3" style={{ border: '1px dotted #1a1a1a' }}>
                    <h1>Test - Goals</h1>
                    <GoalForm/>
                </div>
                <div className="col-12 col-md-8 mb-3">
                {loading ? (
                <div>Loading...</div>
                ) : (
                <GoalList
                goals={goals}
                title="Some Feed for Goal(s)..."/>
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
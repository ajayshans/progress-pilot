import { Link } from 'react-router-dom';

const GoalList = ({
  goals,
  title,
  showTitle = true,
  showUsername = false,
}) => {
  if (!goals.length) {
    return <h3>No Goals Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {goals &&
        goals.map((goal) => (
          <div key={goal._id} className="card mb-3">
            <h4 className="card-header bg-black text-white p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-white"
                //   Need to change goalOwner to something else
                  to={`/goals/${goal.goalOwner}`}
                >
                  {goal.goalOwner} <br />
                  <span style={{ fontSize: '1rem' }}>
                    All users {goal.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    ~ {goal.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-black text-white text-center p-2">
                <p>{goal.goalName}</p>
                <p>{goal.goalDescription}</p>
                <p>{goal.goalReward}</p>
                {/* <p>{goal.taskProgress}%</p> */}
            </div>
            <Link
              className="btn btn-light btn-block btn-squared"
              to={`/goals/${goal._id}`}
            >
              View Tasks
            </Link>
          </div>
        ))}
    </div>
  );
};

export default GoalList;

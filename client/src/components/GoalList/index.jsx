import { Link } from 'react-router-dom';

const GoalList = ({
  goals,
  title,
  showTitle = true,
  showUsername = true,
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
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                //   Need to change goalOwner to something else
                  to={`/goals/${goal.goalOwner}`}
                >
                  {goal.goalOwner} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this goal on {goal.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this goal on {goal.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{goal.goalDescription}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/goals/${goal._id}`}
            >
              Join the discussion on this goal.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default GoalList;

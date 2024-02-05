const TaskList = ({ tasks = [] }) => {
    if (!tasks.length) {
      return <h3>No Tasks Yet</h3>;
    }
  
    return (
      <>
        <h3
          className="p-5 display-inline-block"
          style={{ borderBottom: '1px dotted #1a1a1a' }}
        >
          Tasks
        </h3>
        <div className="flex-row my-4">
          {tasks &&
            tasks.map((task) => (
              <div key={task._id} className="col-12 mb-3 pb-3">
                <div className="p-3 bg-dark text-light">
                  <h5 className="card-header">
                    {task.taskName}
                    <span style={{ fontSize: '0.825rem' }}>
                      ~ {task.taskCreatedAt}
                    </span>
                  </h5>
                  <p className="card-body">Task Name: {task.taskName}</p>
                  <p className="card-body">Task Description: {task.taskDescription}</p>
                  <p className="card-body">Task Assignee: {task.taskAssignee}</p>
                  <p className="card-body">Task Complete: {task.taskComplete}</p>
                </div>
              </div>
            ))}
        </div>
      </>
    );
  };
  
  export default TaskList;
  
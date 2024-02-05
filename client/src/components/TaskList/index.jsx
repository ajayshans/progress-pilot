const TaskList = ({ tasks = [] }) => {
    if (!tasks.length) {
      return <h3>No Tasks Yet - Add below! </h3>;
    }
  
    return (
      <>
        <h3
          className="px-3 mb-0 display-inline-block"
          style={{ borderBottom: '1px dotted #1a1a1a' }}
        >
          Tasks
        </h3>
        <div className="flex-row my-4">
          {tasks &&
            tasks.map((task) => (
              <div key={task._id} className="col-12 pb-3">
                <div className="p-3 bg-black text-white">
                  <h5 className="card-header text-center text-uppercase">
                    {task.taskAssignee} - {task.taskName} - <span>{task.taskComplete}</span>
                    <span style={{ fontSize: '0.825rem' }}>
                    </span>
                  </h5>
                  <div className="bg-white text-black p-2">
                    <p className="card-body">Task Description: {task.taskDescription}</p>
                    <p className="card-body">Task Assignee: {task.taskAssignee}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </>
    );
  };
  
  export default TaskList;
  
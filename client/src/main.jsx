import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App';
import Home from './pages/Home';
import Goals from './pages/Goals';
import SingleGoal from './pages/SingleGoal';
import CreateGoal from './pages/CreateGoal';
import GoalTasks from './pages/GoalTasks';
import Squad from './pages/Squad.jsx';
import CreateSquadMember from './pages/CreateSquadMember.jsx';
import UpdateSquadMember from './pages/UpdateSquadMember.jsx';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/goals',
        element: <Goals />
      }, {
        path: '/goals/:goalId',
        element: <SingleGoal />
      }, {
        path: '/addgoal',
        element: <CreateGoal />
      }, {
        path: '/goals/:goalId/tasks',
        element: <GoalTasks/>
      }, {
        path: '/squad',
        element: <Squad />
      }, {
        path: '/addsquadmember',
        element: <CreateSquadMember />
      }, {
        path: '/squad/:squadMemberId',
        element: <UpdateSquadMember />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

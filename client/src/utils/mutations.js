import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_GOAL = gql`
  mutation addGoal($goalName: String!, $goalDescription: String!, $goalReward: String!) {
    addGoal(goalName: $goalName, goalDescription: $goalDescription, goalReward: $goalReward) {
      _id
      goalName
      goalDescription
      goalReward
      goalOwner
      createdAt
    }
  }
`;

export const ADD_TASK = gql`
  mutation addTask($goalId: ID!, $taskName: String!, $taskDescription: String!, $taskAssignee: String!, $taskComplete: String!) {
    addTask(goalId: $goalId, taskName: $taskName, taskDescription: $taskDescription, taskAssignee: $taskAssignee, taskComplete: $taskComplete) {
      _id
      goalName
      goalDescription
      goalReward
      goalOwner
      createdAt
      tasks {
        _id
        taskName
        taskDescription
        taskAssignee
        taskComplete
        taskCreatedAt
      }
    }
  }
`;

export const ADD_SQUAD = gql`
  mutation addSquad($name: String!, $relation: String!, $efficacyScore: String!, $weeklyHoursAvailable: String!) {
    addSquad(name: $name, relation: $relation, efficacyScore: $efficacyScore, taskComplete: $taskComplete) {
        _id
        name
        relation
        efficacyScore
        weeklyHoursAvailable
        owner
    }
  }
`;

export const DELETE_GOAL = gql`
  mutation removeGoal($goalId: ID!) {
    removeGoal(goalId: $goalId) {
        _id
        goalName
        goalDescription
        goalReward
        goalOwner
        createdAt
    }
  }
`;


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
// Queries
import { gql } from '@apollo/client';

export const QUERY_CHECKOUT = gql`
  query getCheckout{
    checkout{
      session
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      goals {
        _id
        goalName
        goalDescription
        createdAt
      }
      squadMembers {
        _id
        name
        relation
        efficacyScore
        weeklyHoursAvailable
      }
    }
  }
`;

export const QUERY_GOALS = gql`
  query getGoals {
    goals {
      _id
      goalName
      goalDescription
      goalReward
      goalOwner
      createdAt
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      goals {
        _id
        goalDescription
        goalOwner
        createdAt
      }
    }
  }
`;

export const QUERY_SINGLE_GOAL = gql`
  query getSingleGoal($goalId: ID!) {
    goal(goalId: $goalId) {
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
// typeDefs - data accessible by front-end (GraphQL instead of REST APIs)

const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    goals: [Goal]!
    squadMembers: [SquadMember]!
  }

  type Goal {
    _id: ID
    goalName: String
    goalDescription: String
    goalReward: String
    goalOwner: String
    createdAt: String
    goalSquadMembers: [SquadMember]!
    tasks: [Task]!
  }

  type SquadMember {
    _id: ID
    name: String
    relation: String
    efficacyScore: Int
    weeklyHoursAvailable: Int
    owner: [User]!
  }

  type Task {
    _id: ID
    taskName: String
    taskDescription: String
    taskAssignee: String
    taskComplete: String
    taskCreatedAt: String
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    goals(username: String): [Goal]
    goal(goalId: ID!): Goal
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addGoal(goalName: String!, goalDescription: String!, goalReward: String!): Goal
    addTask(goalId: ID!, taskName: String!, taskDescription: String!, taskAssignee: String!, taskComplete: String!): Goal
    removeGoal(goalId: ID!): Goal
    removeTask(goalId: ID!, taskId: ID!): Goal
  }
`;

module.exports = typeDefs;

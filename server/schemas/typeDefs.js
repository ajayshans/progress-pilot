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
    goalSquadMembers: [SquadMember]!
    goalOwner: [User]!
  }

  type SquadMember {
    _id: ID
    name: String
    relation: String
    efficacyScore: Int
    weeklyHoursAvailable: Int
    owner: [User]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    goals(username: String): [Goal]
    goal(thoughtId: ID!): Goal
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addGoal(goalDescription: String!): Goal
    addTask(goalId: ID!, taskDescription: String!): Goal
    removeGoal(goalId: ID!): Goal
    removeTask(goalId: ID!, taskId: ID!): Goal
  
}
`;

module.exports = typeDefs;

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

//   type Auth {
//     token: ID!
//     user: User
//   }

//   type Query {
//     users: [User]
//     user(username: String!): User
//     thoughts(username: String): [Thought]
//     thought(thoughtId: ID!): Thought
//     me: User
//   }

//   type Mutation {
//     addUser(username: String!, email: String!, password: String!): Auth
//     login(email: String!, password: String!): Auth
//     addThought(thoughtText: String!): Thought
//     addComment(thoughtId: ID!, commentText: String!): Thought
//     removeThought(thoughtId: ID!): Thought
//     removeComment(thoughtId: ID!, commentId: ID!): Thought
//   }
`;

module.exports = typeDefs;

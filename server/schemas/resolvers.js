//  resolvers - data passed to front-end (GraphQL instead of REST APIs)

const { User, Goal, SquadMember } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('goals').populate('squadMembers');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('goals').populate('squadMembers');
    },
    goals: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Goal.find(params).sort({ createdAt: -1 });
    },
    goal: async (parent, { goalId }) => {
      return Goal.findOne({ _id: goalId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('goals').populate('squadMembers');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addGoal: async (parent, { goalDescription }, context) => {
      if (context.user) {
        const goal = await Goal.create({
          goalDescription,
          goalOwner: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { goals: goal._id } }
        );

        return goal;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    addTask: async (parent, { goalId, taskDescription }, context) => {
      if (context.user) {
        return Goal.findOneAndUpdate(
          { _id: goalId },
          {
            $addToSet: {
              comments: { taskDescription, taskAssignee: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeGoal: async (parent, { goalId }, context) => {
      if (context.user) {
        const goal = await Goal.findOneAndDelete({
          _id: goalId,
          goalowner: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { goals: goal._id } }
        );

        return goal;
      }
      throw AuthenticationError;
    },
    removeTask: async (parent, { goalId, taskId }, context) => {
      if (context.user) {
        return Goal.findOneAndUpdate(
          { _id: goalId },
          {
            $pull: {
              comments: {
                _id: taskId,
                // Update accordingly
                taskAssignee: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;

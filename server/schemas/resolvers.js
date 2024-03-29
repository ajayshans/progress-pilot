//  resolvers - data passed to front-end (GraphQL instead of REST APIs)

const { User, Goal, SquadMember } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_51Oh2P2AjWthucpu63T5doUuDE2LW2Jcic5WWlTIHV50mheE3Tp8JzsWuCyZQgw0OItDogpuKYBLt71AI0YxAPuXq00zT1XTf6k');

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
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const line_items = [{
          price_data: {
              currency: 'aud',
              product_data: {
                  name: 'Progress Pilot $10 Donation'
              },
              unit_amount: 10 * 100
          },
          quantity: 1
      }];

      const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items,
          mode: 'payment',
          success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${url}/`,
      });

      return { session: session.id };
    }
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
    addGoal: async (parent, { goalName, goalDescription, goalReward }, context) => {
      if (context.user) {
        const goal = await Goal.create({
          goalName,
          goalDescription,
          goalReward,
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
    addTask: async (parent, { goalId, taskName, taskDescription, taskAssignee, taskComplete }, context) => {
      if (context.user) {
        return Goal.findOneAndUpdate(
          { _id: goalId },
          {
            $addToSet: {
              tasks: { 
                taskName,
                taskDescription,
                taskAssignee,
                taskComplete
              },
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
          goalOwner: context.user.username,
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
              tasks: {
                _id: taskId,
                // Update accordingly
                // taskAssignee: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    updateGoalDescription: async (parent, { goalId, newGoalDescription }, context) => {
      if (context.user) {
        const updatedGoal = await Goal.findOneAndUpdate({
          _id: goalId,
          goalOwner: context.user.username,
        },
        {goalDescription: newGoalDescription},
        { new: true }
        );

        if(!updatedGoal) {
          throw new Error('Goal not found or user does not have permission to update')
        }

        return updatedGoal;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;

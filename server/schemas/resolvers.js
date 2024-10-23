const { User } = require('../models/User'); // Adjust the path as necessary
const { signToken } = require('../utils/auth'); // Import the signToken function

const resolvers = {
  Query: {
    // Resolver for the "me" query
    me: async (parent, args, context) => {
      // Check if user is authenticated
      if (!context.user) {
        throw new Error('Not logged in');
      }
      // Return the authenticated user
      return User.findById(context.user._id);
    },
  },
  Mutation: {
    // Resolver for user login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('No user found with this email address');
      }
      const isCorrectPassword = await user.isCorrectPassword(password);
      if (!isCorrectPassword) {
        throw new Error('Incorrect password');
      }
      const token = signToken(user);
      return { token, user };
    },

    // Resolver for adding a new user
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    // Resolver for saving a book
    saveBook: async (parent, { bookId, authors, description, title, image, link }, context) => {
      if (!context.user) {
        throw new Error('Not logged in');
      }
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        {
          $addToSet: { savedBooks: { bookId, authors, description, title, image, link } },
        },
        { new: true }
      );
      return updatedUser;
    },

    // Resolver for removing a saved book
    removeBook: async (parent, { bookId }, context) => {
      if (!context.user) {
        throw new Error('Not logged in');
      }
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        {
          $pull: { savedBooks: { bookId } },
        },
        { new: true }
      );
      return updatedUser;
    },
  },
};

module.exports = resolvers;

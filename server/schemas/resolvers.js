const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query : {
      users: async () => {
        return user.find();
      },
  
      user: async (parent, { username }) => {
        return user.findOne({ _id: username });
      },
    },
  Mutation: {
    addUser: async (parent, { name, email,password }) => {
      const user = await user.create({ name, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await user.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, args, context) => {
      const userbook = await saveBook.create(args);

      await User.findOneAndUpdate(
        { _id: context.user.id  },
        { $addToSet: { savebooks: args } },
        { new: true, runValitors: true}
      );

      return userbook;
    },
  
    removeBook: async (parent, { bookId, context }) => {
      if(context.user) { 
      return Profile.findOneAndUpdate(
        { _id: contex.user._id },
        { $pull: { saveBooks: {bookId: args.bookId } } },
        { new: true }
      );
     }
     throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;

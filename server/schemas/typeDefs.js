const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
		password: String
		savedBooks: [Book]
  }

  type Book {
    _id: ID!
    authors: String
    description: String
    link: String
    image: String
    title: String
  }

  type Query {
    profile: [Profile]!
    profile(profileId: ID!): Profile
    user:user
    books: [book]
   
  }

  type Auth{
    token :ID!
    user:User
}


  type Mutation {
    adduser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    saveBook(bookData: BookInput): User
    removeProfile: Profile
    removeBook(bookId: ID!): User
  }
`;
// Export the typeDefs
module.exports = typeDefs;

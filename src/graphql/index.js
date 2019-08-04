const { gql } = require('apollo-server');
const { Author, Book } = require('../store');

const resolvers = {
  Query: {
    books: () => Book.findAll(),
    book: (_, args) => Book.find({ where: args }),
    author: (_, args) => Author.find({ where: args })
  },
  Mutation: {
    addBook: (_, { title, cover_image_url, average_rating, authorId }) => {

      return Book.create({
        title: title,
        cover_image_url: cover_image_url,
        average_rating: average_rating,
        authorId: authorId
      }).then(book => {
        return book;
      });
    }
  },
  Author: {
    books: (author) => author.getBooks(),
  },
  Book: {
    author: (book) => book.getAuthor(),
  },
};

const typeDefs = gql`
    type Author {
      id: Int!
      first_name: String!
      last_name: String!
      books: [Book]!
    }

    type Book {
      id: Int!
      title: String!
      cover_image_url: String!
      average_rating: Float!
      author: Author!
    }

    type Query {
      books: [Book!]!,
      book(id: Int!): Book!
      author(id: Int!): Author!

    }

    type Mutation {
      addBook(title: String!, cover_image_url: String!, average_rating: Float!, authorId: Int!): Book!
    }
  `;

  module.exports = {
    typeDefs,
    resolvers
  }

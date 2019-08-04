const Sequelize = require('sequelize');

const db = new Sequelize('coolreads', null, null, {
  dialect: 'sqlite',
  storage: './coolreads.sqlite',
});

const AuthorModel = db.define('author', {
  first_name: { type: Sequelize.STRING },
  last_name: { type: Sequelize.STRING },
});

const BookModel = db.define('book', {
  title: { type: Sequelize.STRING },
  cover_image_url: { type: Sequelize.STRING },
  average_rating: { type: Sequelize.STRING },
});

AuthorModel.hasMany(BookModel);
BookModel.belongsTo(AuthorModel);

const Author = db.models.author;
const Book = db.models.book;

module.exports = { AuthorModel, BookModel, Author, Book };

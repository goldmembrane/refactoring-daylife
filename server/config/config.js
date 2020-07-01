module.exports = {
  development: {
    username: 'root',
    password: process.env.DATABASE_PASSWORD, //export DATABASE_PASSWORD=your_password_here
    database: 'daylife',
    host: 'localhost',
    dialect: 'mysql',
    logging: false
  }
};

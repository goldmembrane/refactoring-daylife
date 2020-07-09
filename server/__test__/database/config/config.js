module.exports = {
  development: {
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'daylife_test',
    host: 'localhost',
    dialect: 'mysql',
    logging: false
  }
};

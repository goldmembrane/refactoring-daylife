module.exports = {
  development: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "daylife",
    host: "localhost",
    dialect: "mysql",
    logging: false,
  },
};

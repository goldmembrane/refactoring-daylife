module.exports = {
  development: {
    username: "daylife",
    password: process.env.DATABASE_PASSWORD,
    database: "daylife",
    host: "ec2-54-180-87-72.ap-northeast-2.compute.amazonaws.com",
    dialect: "mysql",
    logging: false,
  },
};

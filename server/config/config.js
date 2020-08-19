module.exports = {
  development: {
    username: "daylife",
    password: process.env.DATABASE_PASSWORD,
    database: "daylife",
    host: "daylife-database.csmeh7i5hzpa.ap-northeast-2.rds.amazonaws.com",
    port: 3306,
    dialect: "mysql",
    logging: false,
  },
};

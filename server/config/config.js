module.exports = {
  development: {
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'daylife',
    host: 'daylife.c3ojf5yrkwaf.ap-northeast-2.rds.amazonaws.com',
    port: 13306,
    dialect: 'mysql',
    logging: false
  }
};

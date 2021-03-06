require('dotenv').config()

module.exports = {
  development: {
    username: process.env.RDS_DATABASE_USERNAME,
    password: process.env.RDS_DATABASE_PASSWORD,
    database: process.env.RDS_DATABASE_NAME,
    host: process.env.RDS_DATABASE_HOST,
    dialect: 'mysql',
    port: process.env.RDS_DATABASE_PORT,
    logging: false,
  },
  test: {
    username: process.env.RDS_DATABASE_USERNAME,
    password: process.env.RDS_DATABASE_PASSWORD,
    database: process.env.RDS_DATABASE_NAME,
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    // port: process.env.RDS_DATABASE_PORT,
  },
  production: {
    username: process.env.RDS_DATABASE_USERNAME,
    password: process.env.RDS_DATABASE_PASSWORD,
    database: process.env.RDS_DATABASE_NAME,
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    // port: process.env.RDS_DATABASE_PORT,
  },
}

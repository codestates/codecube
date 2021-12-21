require('dotenv').config()

// module.exports = {
//   development: {
//     username: process.env.RDS_DATABASE_USERNAME,
//     password: process.env.RDS_DATABASE_PASSWORD,
//     database: process.env.RDS_DATABASE_NAME,
//     host: process.env.RDS_DATABASE_HOST,
//     dialect: 'mysql',
//     port: process.env.RDS_DATABASE_PORT,
//   },
//   test: {
//     username: process.env.RDS_DATABASE_USERNAME,
//     password: process.env.RDS_DATABASE_PASSWORD,
//     database: process.env.RDS_DATABASE_NAME,
//     host: process.env.RDS_DATABASE_HOST,
//     dialect: 'mysql',
//     port: process.env.RDS_DATABASE_PORT,
//   },
//   production: {
//     username: process.env.RDS_DATABASE_USERNAME,
//     password: process.env.RDS_DATABASE_PASSWORD,
//     database: process.env.RDS_DATABASE_NAME,
//     host: process.env.RDS_DATABASE_HOST,
//     dialect: 'mysql',
//     port: process.env.RDS_DATABASE_PORT,
//   },
// }

// local환경에서 테스트 할때 사용할 DataBase용 config
module.exports = {
  development: {
    username: 'root',
    password: '1111',
    database: 'codecube',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
  },
}

require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 80
const morgan = require('morgan')
const sequelize = require('./models').sequelize
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
)

app.use('/', indexRouter.users)
app.use('/members', indexRouter.members)
app.use('/projects', indexRouter.projects)
app.use('/github', indexRouter.github)
app.use('/openapi', indexRouter.openapi)

app.listen(PORT, () => {
  if (PORT !== 80) {
    console.log(`      🚀 server listening thru local env on port ${PORT}`)
  } else {
    console.log(`      🚀 server listening thru deploy env on port ${PORT}`)
  }
})

module.exports = app

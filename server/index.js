require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 4000
const morgan = require('morgan')
const sequelize = require('./models').sequelize
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes')

// sequelize.sync({ alter: true })

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(morgan('dev'))
// app.use(cors({ origin: true }))
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
)

app.use('/', indexRouter.users)
app.use('/members', indexRouter.members)
app.use('/projects', indexRouter.projects)
app.use('/github', indexRouter.github)
app.use('/openapi', indexRouter.openapi)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

module.exports = app

require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 4000
const morgan = require('morgan')
const sequelize = require('./models').sequelize
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes')

sequelize.sync()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors({ origin: true }))

// app.get('/', (req, res) => {
//   res.send('성공시 체크하기')
// })
app.use('/', indexRouter.users)
app.use('/members', indexRouter.members)
app.use('/projects', indexRouter.projects)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

module.exports = app

//squelize 환경구축하고
//연결할떄 DB
// User.sync({ alter: true}) : 테이블의 현재 state(column, data type etc)를 체크하고 model과 비교했을 때 필요한 변경사항에 대해 수행한다.
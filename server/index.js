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

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
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

// const multer = require('multer')
// const AWS = require('aws-sdk')
// const multerS3 = require('multer-s3')

module.exports = {
  app,
  // upload: multerS3({
  //   s3: new AWS.S3({
  //     accessKeyId: process.env.S3_MULTER_ID,
  //     secretAccessKey: process.env.S3_MULTER_KEY,
  //     region: process.env.S3_MULTER_NAME,
  //   }),
  //   bucket: process.env.S3_MULTER_NAME,
  //   contentType: multerS3.AUTO_CONTENT_TYPE,
  //   acl: 'public-read-write',
  //   key: (req, file, cb) => {
  //     const extension = path.extname(file.originalname)
  //     cb(null, Date.now().toString() + extension)
  //   },
  //   limits: { fileSize: 5 * 1024 * 1024 },
  // }),
}

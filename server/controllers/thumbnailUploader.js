require('dotenv').config()
const { solveToken } = require('./function')
const path = require('path')
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')

const configPath = path.resolve('./config/jhs3.json')
AWS.config.loadFromPath(configPath)
const S3 = new AWS.S3()

const thumbnailUploader = multer({
  storage: multerS3({
    s3: S3,
    bucket: process.env.S3_THUMBNAIL,
    key: (req, file, callback) => {
      const id = String(solveToken(req.cookies.jwt).id)
      const ext = path.extname(file.originalname)
      const filename = id + Date.now().toString() + ext
      callback(null, filename)
    },
    acl: 'public-read',
  }),
})

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const p = path.resolve('./testDest/')
//     cb(null, p)
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname)
//     cb(null, path.basename(file.originalname, ext) + Date.now() + ext)
//   },
// })

// const thumbnailUploader = multer({ storage: storage })

module.exports = thumbnailUploader.fields([
  { name: 'data' },
  { name: 'thumbnail' },
])

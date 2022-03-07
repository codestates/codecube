require('dotenv').config()
const { solveToken } = require('./function')
const path = require('path')
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')

// server/config/jhs3.json에 게시글 미리보기 사진용 s3버킷 config파일있습니다.
const configPath = path.resolve('./config/jhs3.json')
AWS.config.loadFromPath(configPath)
const S3 = new AWS.S3()

const thumbnailUploader = multer({
  storage: multerS3({
    s3: S3,
    bucket: process.env.S3_THUMBNAIL, // .env에 S3_THUMBNAIL 추가됐습니다.
    key: (req, file, callback) => {
      const id = String(solveToken(req.cookies.jwt).id)
      const ext = path.extname(file.originalname)
      const filename = id + Date.now().toString() + ext
      callback(null, filename)
    },
    acl: 'public-read',
  }),
})

module.exports = thumbnailUploader.fields([
  { name: 'data' },
  { name: 'thumbnail' },
])

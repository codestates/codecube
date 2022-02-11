require('dotenv').config()
const { solveToken } = require('./controllers/function')
const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

aws.config.loadFromPath(__dirname + '/s3.json')
const s3 = new aws.S3()
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_MULTER_NAME,
    acl: 'public-read',
    key: (req, file, cb) => {
      // console.log(req.cookies.authorization)
      const id = String(solveToken(req.cookies.authorization).id)
      cb(null, id)
    },
  }),
})

const uploadImage = async (req, res) => {
  // console.log(req.file)
  if (!req.file) {
    return res.status(400).send()
  } else {
    return res.status(200).json({})
  }
}

module.exports = { uploadImage, upload }

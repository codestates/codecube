
   
require('dotenv').config()

const multer = require('multer') 
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')


aws.config.loadFromPath(__dirname + '/s3multer.json')
const s3 = new aws.S3()
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_MULTER_NAME,
        acl: 'public-read',
        key: (req, file, cb) => { 
        const uuid =  verifyToken(req.headers.authorization).uuid
         cb(null,uuid)
      }
    })
})

const uploadImage = async (req, res) => {

  console.log(req.file)
  if(!req.file){
    return res.status(400).send()
  }
  else{
    return res.status(200).json({})
  }
}

module.exports = {uploadImage, upload}
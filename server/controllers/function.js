require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { sign, verify } = require('jsonwebtoken')

module.exports = {
  makejwt: (data) => {
    const private = fs.readFileSync(path.resolve(__dirname, '../certs/rsa.key'))
    const option = {
      expiresIn: '10d',
      issuer: 'codecube',
      subject: 'data',
      algorithm: 'RS256',
    }
    try {
      const token = sign(data, private, option)
      return token
    } catch (e) {
      return e
    }
  },
  solveToken: (token) => {
    token = token.split(' ')[1]
    const solveCert = fs.readFileSync(
      path.resolve(__dirname, '../certs/rsa.key.pub')
    )
    const result = verify(token, solveCert, { algorithm: 'RS256' })
    return result
  },
}

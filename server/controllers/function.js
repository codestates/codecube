require('dotenv').config()
const { sign, verify } = require('jsonwebtoken')

module.exports = {
  makejwt: (data) => {
    const key = process.env.JWT_KEY
    const option = { expiresIn: '10d', issuer: 'codecube', subject: 'data' }
    const token = sign(data, key, option)

    return token
  },
  solveToken: (token) => {
    const key = process.env.JWT_KEY

    const result = verify(token, key)

    return result
  },
}

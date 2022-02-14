require('dotenv').config()
const { sign, verify } = require('jsonwebtoken')

module.exports = {
  makejwt: (data) => {
    const key = process.env.JWT_KEY
    const option = { expiresIn: '10d', issuer: 'codecube', subject: 'data' }
    try {
      const token = sign(data, key, option)
      return token
    } catch (e) {
      return e
    }
  },
  solveToken: (token) => {
    token = token.split(' ')[1]
    const key = process.env.JWT_KEY
    const result = verify(token, key)
    return result
  },
}

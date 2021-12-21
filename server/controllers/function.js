//jwt토큰 만들고 해독하는 함수 작성 예정

// HA3 참고

const { sign, verify } = require('jsonwebtoken')

module.exports = {
  makejwt: (data) => {
    const key = 'chlwjdehqor'
    const option = { expiresIn: '10d', issuer: 'codecube', subject: 'data' }
    const token = sign(data, key, option)

    return token
  },
  solveToken: (token) => {
    const key = 'chlwjdehqor'

    const result = verify(token, key)

    return result
  },
}

require('dotenv').config()
const models = require('../models')
const client_id = process.env.GITHUB_CLIENT_ID
const client_secret = process.env.GITHUB_CLIENT_SECRET
const axios = require('axios')
const { makejwt, solveToken } = require('./function')
axios.defaults.withCredentials = true
module.exports = {
  callback: async (req, res) => {
    if (!req.body.authorizationCode) {
      return res.status(302).location('/')
    }
    axios({
      method: 'post',
      url: 'https://github.com/login/oauth/access_token',
      headers: {
        accept: 'application/json',
      },
      data: {
        client_id,
        client_secret,
        code: req.body.authorizationCode,
      },
    })
      .then((response) => {
        accessToken = response.data.access_token
        res.status(200).json({ accessToken: accessToken })
      })
      .catch((e) => {
        console.log('github login errer!')
        res.status(404)
      })
  },
  userInfo: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(403).send({
        message: 'no permission to access resources',
      })
    }
    if (req.headers.authorization) {
      await axios
        .get(
          'https://api.github.com/user',
          // {
          //   withCredentials: true,
          // },
          {
            headers: {
              authorization: `token ${req.headers.authorization}`,
            },
          }
        )
        .then(async (response) => {
          const { name, login, html_url, public_repos } = response.data
          const calendar = `https://ghchart.rshah.org/219138/${login}`
          const userInfo = { login, html_url, public_repos, calendar }
          const isExist = await models.users.findOne({
            where: { username: login },
            raw: true,
          })

          if (isExist) {
            const { id, username, email, description, image } = isExist

            const jwt = makejwt({ id, username, email })

            return res
              .cookie('jwt', `bearer ${jwt}`, {
                httpOnly: true,
              })
              .cookie('id', id, {
                httpOnly: true,
              })
              .status(200)
              .json({ message: 'LogIn success', userInfo })
          }
          if (!isExist) {
            const signUp = models.users.create({
              username: login,
              email: `${login}@github.com`,
              password: req.headers.authorization,
            })
            const { id, username, email, description, image } =
              signUp.dataValues
            const jwt = makejwt({ id, username, email })
            res
              .cookie('jwt', `bearer ${jwt}`, {
                httpOnly: true,
              })
              .cookie('id', id, {
                httpOnly: true,
              })
              .status(201)
              .send({ message: 'Created', userInfo })
          }
        })
        .catch((err) => {
          console.log('에러발생!!!')
        })
    }
  },
}

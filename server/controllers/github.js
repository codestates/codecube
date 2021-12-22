require('dotenv').config()
const client_id = process.env.GITHUB_CLIENT_ID
const client_secret = process.env.GITHUB_CLIENT_SECRET
const axios = require('axios')

module.exports = {
  callback: async (req, res) => {
    if (!req.body.authorizationCode) {
      return res.status(400).json({ message: 'no authcode' })
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
    let response = await axios.get('https://api.github.com/user', {
      headers: {
        authorization: `token ${req.headers.authorization}`,
      },
    })

    const { name, login, html_url, public_repos } = response.data
    const calendar = `https://ghchart.rshah.org/219138/${login}`
    const userInfo = { login, html_url, public_repos, calendar }

    res.status(200).send({ userInfo })
  },
}

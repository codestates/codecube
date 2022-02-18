require('dotenv').config()
const models = require('../models')
const client_id = process.env.GITHUB_CLIENT_ID
const client_secret = process.env.GITHUB_CLIENT_SECRET
const axios = require('axios')
const { makejwt, solveToken } = require('./function')
// axios.defaults.withCredentials = true
module.exports = {
  callback: async (req, res) => {
    if (!req.body.authorizationCode) {
      return res.status(302).location('/')
    } else if (req.body.gitcode === 'git') {
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
    } else if (req.body.gitcode === 'nonegit') {
      if (!req.body.stateCode) {
        const params = new URLSearchParams()
        params.append('grant_type', 'authorization_code')
        params.append('client_id', process.env.KAKAO_CLIENT_ID)
        params.append('redirect_uri', `${process.env.ORIGIN}`)
        params.append('code', req.body.authorizationCode)

        await axios
          .post('https://kauth.kakao.com/oauth/token', params, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          })
          .then((result) => {
            const {
              access_token,
              refresh_token,
              expires_in,
              refresh_token_expires_in,
            } = result.data
            res.cookie('kakaoaccesstoken', access_token, expires_in)
            res.cookie(
              'kakaorefreshtoken',
              refresh_token,
              refresh_token_expires_in
            )
            res.send(result.data)
          })
          .catch((err) => {
            console.log('카톡토큰 에러')
            res.send(err)
          })
      } else if (req.body.stateCode) {
        const params = new URLSearchParams()
        params.append('grant_type', 'authorization_code')
        params.append('client_id', process.env.NAVER_CLIENT_ID)
        params.append('client_secret', process.env.NAVER_CLIENT_SECRET)
        params.append('code', req.body.authorizationCode)
        params.append('state', req.body.stateCode)
        await axios
          .post('https://nid.naver.com/oauth2.0/token', params, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          })
          .then((result) => {
            // setGtiAccessToken(res.data.accessToken)
            // window.localStorage.setItem('accessToken', res.data.accessToken)
            // getGithudInfo(res.data.accessToken)
            //   console.log('네이버토큰', result.data)
            const { access_token, refresh_token, expires_in } = result.data
            res.cookie('naveraccesstoken', access_token, expires_in)
            res.cookie('naverrefreshtoken', refresh_token, expires_in)
            res.send(result.data)
          })
          .catch((err) => {
            console.log('네이버토근 에러')
            res.send(err)
          })
        // console.log('req.body')
        // res.send('응답이다')
      }
    }
  },
  userInfo: async (req, res) => {
    if (
      !req.headers.authorization &&
      !req.cookies.naveraccesstoken &&
      !req.cookies.kakaoaccesstoken
    ) {
      return res.status(403).send({
        message: 'no permission to access resources',
      })
    } else if (req.headers.authorization && req.headers.gitcode === 'git') {
      console.log('RRRRRRRRR')
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
          console.log('TTTTTTTT')
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
    } else if (req.headers.gitcode === 'nonegit') {
      const { naveraccesstoken, kakaoaccesstoken } = req.cookies
      if (kakaoaccesstoken) {
        await axios
          .get('https://kapi.kakao.com/v2/user/me ', {
            headers: { Authorization: `Bearer ${kakaoaccesstoken}` },
          })
          .then(async (response) => {
            //   const { name, login, html_url, public_repos } = response.data
            //   const calendar = `https://ghchart.rshah.org/219138/${login}`
            //   const userInfo = { login, html_url, public_repos, calendar }
            console.log('카카오데이터', response.data)
            const { profile, email } = response.data.kakao_account
            const { nickname } = profile

            const isExist = await models.users.findOne({
              where: { username: nickname },
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
                username: nickname,
                email: email,
                password: kakaoaccesstoken,
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
            console.log('카톡에러발생!!!')
          })
      } else if (naveraccesstoken) {
        await axios
          .get('https://openapi.naver.com/v1/nid/me', {
            headers: { Authorization: `Bearer ${naveraccesstoken}` },
          })
          .then(async (response) => {
            console.log('네이버데이터', response.data)
            //   const { name, login, html_url, public_repos } = response.data
            //   const calendar = `https://ghchart.rshah.org/219138/${login}`
            //   const userInfo = { login, html_url, public_repos, calendar }
            const { email, name, profile_image, nickname } =
              response.data.response

            const isExist = await models.users.findOne({
              where: { username: name },
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
                username: name,
                email: email,
                password: naveraccesstoken,
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
            console.log('네이버에러발생!!!')
          })
      } else {
        res.send('소셜로그인에 실패하셨습니다. 회원가입을 해주세요')
      }
    }
  },
}

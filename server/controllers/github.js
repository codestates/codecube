require('dotenv').config()
const models = require('../models')
const client_id = process.env.GITHUB_CLIENT_ID
const client_secret = process.env.GITHUB_CLIENT_SECRET
const axios = require('axios')
const { makejwt, solveToken } = require('./function')
// axios.defaults.withCredentials = true
module.exports = {
  callback: async (req, res) => {
    console.log(req.body)
    if (!req.body.authorizationCode) {
      console.log('\n❗️ github/callback:\n 깃헙 auth code가 없습니다.\n')
      return res.status(302).json({ message: 'no auth code' }).location('/')
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
          console.log(
            '\n👍 github/callback/github:\n 성공적으로 깃헙 accessToken을 받아왔습니다.\n'
          )
          return res.status(200).json({ accessToken: accessToken })
        })
        .catch((e) => {
          console.log('\n❗️ github/callback/github:\n err:', err, '\n')
          return res
            .status(404)
            .json({ message: 'Cannot receive Github accessToken' })
        })
    } else if (req.body.gitcode === 'nonegit') {
      if (!req.body.stateCode) {
        // * 카카오 로그인
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
            console.log(
              '\n👍 github/callback/kakao:\n 성공적으로 카카오 accessToken을 받아왔습니다.\n'
            )
            return res
              .cookie('kakaoaccesstoken', access_token, expires_in)
              .cookie(
                'kakaorefreshtoken',
                refresh_token,
                refresh_token_expires_in
              )
              .send(result.data)
          })
          .catch((err) => {
            console.log('\n❗️ github/callback/kakao:\n err:', err, '\n')
            return res
              .status(404)
              .json({ message: 'Cannot receive Kakao accessToken' })
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
            const { access_token, refresh_token, expires_in } = result.data
            console.log(
              '\n👍 github/callback/naver:\n 성공적으로 네이버 accessToken을 받아왔습니다.\n'
            )
            return res
              .cookie('naveraccesstoken', access_token, expires_in)
              .cookie('naverrefreshtoken', refresh_token, expires_in)
              .send(result.data)
          })
          .catch((err) => {
            console.log('\n❗️ github/callback/naver:\n err:', err, '\n')
            return res
              .status(404)
              .json({ message: 'Cannot receive Naver accessToken' })
          })
      }
    }
  },
  userInfo: async (req, res) => {
    if (
      !req.headers.authorization &&
      !req.cookies.naveraccesstoken &&
      !req.cookies.kakaoaccesstoken
    ) {
      console.log('\n❗️ github/userInfo:\n 소셜 accessToken이 없습니다.\n')
      return res.status(403).send({
        message: 'no permission to access resources',
      })
    } else if (req.headers.authorization && req.headers.gitcode === 'git') {
      // * 깃헙로그인 정보요청
      await axios
        .get('https://api.github.com/user', {
          headers: {
            authorization: `token ${req.headers.authorization}`,
          },
        })
        .then(async (response) => {
          const { name, login, html_url, public_repos } = response.data
          const calendar = `https://ghchart.rshah.org/219138/${login}`
          const userInfo = { login, html_url, public_repos, calendar }
          const isExist = await models.users.findOne({
            where: { username: login },
            raw: true,
          })

          if (isExist) {
            // 깃헙 로그인 기존 회원이면 db에서 찾아서 토큰 발행
            const { id, username, email } = isExist
            const jwt = makejwt({ id, username, email })
            console.log(
              '\n👍 github/userInfo:\n 깃헙 userId:',
              id,
              username,
              '님의 로그인 정보를 전송하였습니다.\n'
            )
            return res
              .cookie('jwt', `bearer ${jwt}`, {
                httpOnly: true,
              })
              .status(200)
              .json({ message: 'LogIn success', userInfo })
          }
          if (!isExist) {
            // 깃헙 로그인 신규 유저면 가입시키기
            const signUp = await models.users.create({
              username: login,
              email: `${login}@github.com`,
              password: req.headers.authorization,
              oauth: 1,
            })
            const { id, username, email, description } = signUp.dataValues
            const jwt = makejwt({ id, username, email })
            console.log(
              '\n👍 github/userInfo:\n 깃헙 userId:',
              id,
              username,
              '님의 회원가입 및 로그인 정보를 전송하였습니다.\n'
            )
            return res
              .cookie('jwt', `bearer ${jwt}`, {
                httpOnly: true,
              })
              .status(201)
              .send({ message: 'Created', userInfo })
          }
        })
        .catch((err) => {
          console.log('\n❗️ github/userInfo/github:\n err:', err, '\n')
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
              attributes: ['id', 'username', 'email', 'oauth', 'description'],
              where: { username: name },
              raw: true,
            })

            if (isExist) {
              const { id, username, email } = isExist
              const jwt = makejwt({ id, username, email })
              console.log(
                '\n👍 github/userInfo:\n 네이버 userId:',
                id,
                username,
                '님의 로그인 정보를 전송하였습니다.\n'
              )
              return res
                .cookie('jwt', `bearer ${jwt}`, {
                  httpOnly: true,
                })
                .status(200)
                .json({ message: 'LogIn success', userInfo: isExist })
            }
            if (!isExist) {
              const signUp = await models.users.create({
                username: name,
                //❗️❗️ nickname + @naver.com 으로 할지 그냥 받아온 email 로할지.. email 은 네이버 이메일이 아니다❗️❗️
                email: response.data.response.email,
                password: naveraccesstoken,
                oauth: 1,
              })
              console.log(signUp.dataValues)
              const { id, username, email, oauth } = signUp.dataValues
              const jwt = makejwt({ id, username, email })
              console.log(
                '\n👍 github/userInfo:\n 네이버 userId:',
                id,
                username,
                '님의 회원가입 및 로그인 정보를 전송하였습니다.\n'
              )
              return res
                .cookie('jwt', `bearer ${jwt}`, {
                  httpOnly: true,
                })
                .status(201)
                .send({
                  message: 'Created',
                  userInfo: { id, username, email, oauth },
                })
            }
          })
          .catch((err) => {
            console.log('\n❗️ github/userInfo/naver:\n err:', err, '\n')
            return res
              .status(401)
              .json({ message: 'Invalid naver accessToken' })
          })
      } else {
        // 깃, 카, 네 가아닌 다른 방법으로 getUserInfo 요청이 들어온경우
        console.log(
          '\n❗️ github/userInfo:\n 비정상적인 소셜 로그인 시도입니다.\n'
        )
        return res.status(400).json({ message: 'Bad social login request' })
      }
    }
  },
}

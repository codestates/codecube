const models = require('../models')
const { makejwt, solveToken } = require('./function')
const hoToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiLquYDtmY3si50iLCJlbWFpbCI6InF3ZXJAY29kZS5jb20iLCJkZXNjcmlwdGlvbiI6IuuCmOuKlCDsvZTrlKnsmZXsnbQg65Cg6rGw7JW8IiwiaWF0IjoxNjM5ODE5NzcwLCJleHAiOjE2NDA2ODM3NzAsImlzcyI6ImNvZGVjdWJlIiwic3ViIjoiZGF0YSJ9.FyfaUhfTRW72gdCQnfqCvyRgEjneuAXL70dc2I3XhOU'

module.exports = {
  users: {
    get: async (req, res) => {
      // const token = req.cookie.token
      //token의 payload에 유저정보가 DB유저정보를 확인해서 userInfo에 넣기
      const testInfo = {
        id: 1,
        username: '김홍식',
        email: 'qwer@code.com',
        description: '나는 코딩왕이 될거야'
      }
      const Token = makejwt(testInfo)
      const solve = solveToken(Token)

      const userInfo = await models.users.findAll({
        where: { username: solve.username }
      })

      //token이 만료되거나 유저정보에 없으면
      if (!userInfo) {
        res.status(401).json({ message: 'invalid authorization' })
      }
      //아니면 유저정보를 보내준다.
      else {
        res.status(200).json({ userInfo })
      }
    },
    //회원탈퇴
    delete:  (req, res) => {
      // const Token = req.cookie.token
      const userInfo = solveToken(hoToken)

      if (!userInfo) {
        res.status(401).json({ message: 'no such info' })
      }
      else{
        // await models.users.destroy({where:{username:userInfo}})
        res.status(200).json({message:'byebye'})
      }
    },
  },
  changeinfo: {
    put: (req, res) => {
      const userId = req.params.userId
      models.orders.get(userId, (error, result) => {

      })
    },
  },
  logout: {
    get: (req, res) => {
      const userId = req.params.userId
      models.orders.get(userId, (error, result) => {
        if (error) {
          res.status(500).send('Internal Server Error')
        } else {
          res.status(200).json(result)
        }
      })
    },
  },
  signup: {
    post: (req, res) => {
      //   console.log(req.body)
      const { id, username, image, password, stack } = req.body
      models.users.create({
        username: username,
        email: id,
        password: password,
        image: image,
      })
      res.status(201).json({ message: 'signup successed' })
    },
  },
  login: {
    post: (req, res) => {
      const userId = req.params.userId
      models.orders.get(userId, (error, result) => {
        if (error) {
          res.status(500).send('Internal Server Error')
        } else {
          res.status(200).json(result)
        }
      })
    },
  },
}

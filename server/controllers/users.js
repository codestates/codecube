const models = require('../models')
const { users } = require('../models')
const { makejwt, solveToken } = require('./function')

const whoRU = function (withBearer) {
  const token = withBearer.split(' ')[1]
  const userInfo = solveToken(token)
  return userInfo
}

const { Op } = require('sequelize')
const stacks = require('../models/stacks')
const lodash = require('lodash')

module.exports = {
  users: {
    get: async (req, res) => {
      const rtoken = req.cookies.jwt
      const decoded = whoRU(rtoken)
      const solve = await users.findOne({
        where: { id: decoded.id },
      })
      const userInfo = solve

      const { id, email, username, image, description, createdAt, updatedAt } =
        userInfo.dataValues
      const userData = {
        id,
        email,
        username,
        image,
        description,
        createdAt,
        updatedAt,
      }

      //token이 만료되거나 유저정보에 없으면
      if (!userInfo) {
        res.status(401).json({ message: 'invalid authorization' })
      }
      //아니면 유저정보를 보내준다.
      else {
        res.status(200).json({ message: 'confirmed', data: userData })
      }
    },
    //회원탈퇴
    delete: async (req, res) => {
      const Token = req.cookies.token
      const rtoken = req.cookies.jwt
      console.log('ddddssdsfsdfsdfsfs', req.cookies.token)
      console.log('ddddssdsfsdfsdfsfs', req.cookies.jwt)
      // const userInfo = solveToken(hoToken)

      if (!userInfo) {
        res.status(401).json({ message: 'no such info' })
      } else {
        await models.users.destroy({ where: { id: userInfo.id } })
        res.status(200).json({ message: 'byebye' })
      }
    },
  },
  changeinfo: {
    put: async (req, res) => {
      const token = req.cookies.token
      const newInfo = req.body
      // {username, password, image, stack, description }
      // console.log('ddddssdsfsdfsdfsfs', req.cookies.token)
      // console.log('ddddssdsfsdfsdfsfs', req.cookies.jwt)
      // console.log('ddddssdsfsdfsdfsfs', req.body)

      //요청정보가 없을시
      if (!newInfo) {
        res.status(400).json({ message: 'invalid userinfo' })
      }
      //Token으로 사용자의 현재 정보를 찾는다.
      const userId = solveToken(token).id

      //access Token이 만료될 경우
      if (!userId) {
        res.status(401).json({ message: 'invalid authorization' })
      } else {
        //user 정보 업데아트
        await models.user_stacks.destroy({ where: { userId: userId } })
        const stackobj = {}
        const newarr = []
        newInfo.stacks.forEach((el) => {
          stackobj['userId'] = userId
          stackobj['stackId'] = el
          let element = lodash.cloneDeep(stackobj)
          newarr.push(element)
        })

        await models.user_stacks.bulkCreate(newarr)

        await models.users.update(newInfo, {
          where: {
            id: userId,
          },
        })
        res.status(200).json({
          message: 'successfully modified',
        })
      }
    },
  },
  logout: {
    get: async (req, res) => {
      res
        .status(205)
        .clearCookie('jwt')
        .clearCookie('id')
        .send('Logged out successfully')
    },
  },
  signup: {
    post: async (req, res) => {
      //   console.log(req.body)
      const { username, email, description, image, password, stacks } = req.body
      await models.users.create({
        username: username,
        email: email,
        password: password,
        description: description,
        image: image,
        stacks: stacks,
      })

      const jwt = makejwt({ username, email, description })
      res
        .cookie('jwt', jwt, {
          sameSite: 'None',
          httpOnly: true,
          secure: true,
        })
        .status(201)
        .json({ message: 'signup successed' })
    },
  },
  login: {
    post: async (req, res) => {
      // body에 아이디하고 비밀번호를 확인
      const userInfo = req.body
      // console.log('서버쪽 곤솤르돌', userInfo)
      const { email, password } = userInfo
      // loginuser 변수에 DB에서 회원정보 유무를 확인하여 존재시 변수에 할당
      const loginuser = await models.users.findAll({
        where: {
          email: email,
          password: password,
        },
      })
      const target = loginuser[0].dataValues

      //DB에 유저 정보가 없을시
      if (!target) {
        res.status.json({ message: 'login unsuccessed' })
      }

      //DB에 유저정보가 있을시 jwt토큰을 cookie에 담아서보내줌
      else {
        const { username, email, description, id } = target
        const jwt = makejwt({ id, username, email, description })

        res
          .cookie('jwt', `bearer ${jwt}`, {
            // sameSite: 'None',
            // secure: true,
            httpOnly: true,
          })
          .cookie('id', id, {
            // sameSite: 'None',
            // secure: true,
            httpOnly: true,
          })
          .status(200)
          .json({
            message: 'login successed',
            // data: { authorization: jwt },
          })
      }
    },
  },
}

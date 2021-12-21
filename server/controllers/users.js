// const models = require('../models')
// const { users } = require('../models')
// const { makejwt, solveToken } = require('./function')
// const whoRU = function (withBearer) {
//   const token = withBearer.split(' ')[1]
//   const user_id = solveToken(token)
//   return user_id
// }

// const { Op } = require('sequelize')
// const stacks = require('../models/stacks')
// const hoToken =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiLquYDtmY3si50iLCJlbWFpbCI6InF3ZXJAY29kZS5jb20iLCJkZXNjcmlwdGlvbiI6IuuCmOuKlCDsvZTrlKnsmZXsnbQg65Cg6rGw7JW8IiwiaWF0IjoxNjM5ODE5NzcwLCJleHAiOjE2NDA2ODM3NzAsImlzcyI6ImNvZGVjdWJlIiwic3ViIjoiZGF0YSJ9.FyfaUhfTRW72gdCQnfqCvyRgEjneuAXL70dc2I3XhOU'
// const lodash = require('lodash')

// module.exports = {
//   users: {
//     get: async (req, res) => {
//       console.log(
//         'erewrewwrewreewrwrewerwewrewewrreww',
//         req.headers.authorization
//       )
//       const rtoken = req.headers.authorization.split(' ')[1]
//       // const solve = solveToken(hoToken)
//       // const atocken = req.headers.cookie.split('=')[1]
//       const decoded = solveToken(rtoken)

//       // const token = req.cookie
//       console.log('1231434414123131321312313', decoded)
//       //token의 payload에 유저정보가 DB유저정보를 확인해서 userInfo에 넣기
//       // const testInfo = {
//       //   id: 1,
//       //   username: '김홍식',
//       //   email: 'qwer@code.com',
//       //   description: '나는 코딩왕이 될거야',
//       //   stacks: [1, 2, 3, 4, 5],
//       // }

//       // const Token = makejwt(req.headers.cookie)
//       // const solve = solveToken(token)
//       // console.log(solve)

//       const userInfo = await users.findOne({
//         where: { id: decoded.id },
//       })
//       console.log('뭐찾은거있음??????', userInfo)

//       const stacks = await models.stacks.findAll({
//         attributes: ['id', 'name'],
//         where: {
//           id: {
//             [Op.or]: solve.stacks,
//           },
//         },
//       })

//       // const test = await models.projects.findAll({
//       //   include: {
//       //     model: models.project_users,
//       //     include: [
//       //       {
//       //         model: models.users,
//       //         through: { attributes: ['title'] },
//       //       },
//       //     ],
//       //   },
//       // })

//       solve['stacks'] = stacks

//       //token이 만료되거나 유저정보에 없으면
//       if (!userInfo) {
//         res.status(401).json({ message: 'invalid authorization' })
//       }
//       //아니면 유저정보를 보내준다.
//       else {
//         res
//           // .cookie('jwt', token, {
//           //   sameSite: 'None',
//           //   httpOnly: true,
//           //   secure: true,
//           // })
//           .status(200)
//           .json({ solve })
//       }
//     },
//     //회원탈퇴
//     delete: async (req, res) => {
//       // const Token = req.cookies.token
//       const userInfo = solveToken(hoToken)

//       if (!userInfo) {
//         res.status(401).json({ message: 'no such info' })
//       } else {
//         await models.users.destroy({ where: { id: userInfo.id } })
//         res.status(200).json({ message: 'byebye' })
//       }
//     },
//   },
//   changeinfo: {
//     put: async (req, res) => {
//       // const token = req.cookies.token
//       // const newInfo = req.body
//       // {username, password, image, stack, description }

//       //test
//       newInfo = {
//         username: '준우',
//         description: '이보게 내가 개발자가 될 상인가?',
//         stacks: [1, 2, 3],
//       }
//       //요청정보가 없을시
//       if (!newInfo) {
//         res.status(400).json({ message: 'invalid userinfo' })
//       }
//       //Token으로 사용자의 현재 정보를 찾는다.
//       const userId = solveToken(hoToken).id

//       //access Token이 만료될 경우
//       if (!userId) {
//         res.status(401).json({ message: 'invalid authorization' })
//       } else {
//         //user 정보 업데아트
//         await models.user_stacks.destroy({ where: { user_id: userId } })
//         const stackobj = {}
//         const newarr = []
//         newInfo.stacks.forEach((el) => {
//           stackobj['user_id'] = userId
//           stackobj['stack_id'] = el
//           let element = lodash.cloneDeep(stackobj)
//           newarr.push(element)
//         })

//         await models.user_stacks.bulkCreate(newarr)

//         await models.users.update(newInfo, {
//           where: {
//             id: userId,
//           },
//         })
//         res.status(200).json({
//           message: 'successfully modified',
//         })
//       }
//     },
//   },
//   logout: {
//     get: async (req, res) => {
//       //  const Token = req.cookies.token

//       const solve = solveToken(hoToken)
//       const userInfo = await models.users.findAll({
//         where: { id: solve.id },
//       })
//       if (userInfo) {
//         res
//           .cookie('token', '', {
//             sameSite: 'None',
//             httpOnly: true,
//             secure: true,
//           })
//           .status(200)
//           .json({ message: 'logout successed' })
//       }
//     },
//   },
//   signup: {
//     post: async (req, res) => {
//       //   console.log(req.body)
//       const { username, email, description, image, password, stack } = req.body
//       const userId = await models.users.create({
//         username: username,
//         email: email,
//         password: password,
//         description: description,
//         image: image,
//       })
//       // models.user_stacks.({

//       // })
//       const jwt = makejwt({ username, email, description })
//       res
//         .cookie('jwt', jwt, {
//           sameSite: 'None',
//           httpOnly: true,
//           secure: true,
//         })
//         .status(201)
//         .json({ message: 'signup successed' })
//     },
//   },
//   login: {
//     post: async (req, res) => {
//       // body에 아이디하고 비밀번호를 확인
//       const userInfo = req.body
//       // console.log('서버쪽 곤솤르돌', userInfo)
//       const { email, password } = userInfo
//       // loginuser 변수에 DB에서 회원정보 유무를 확인하여 존재시 변수에 할당
//       const loginuser = await models.users.findAll({
//         where: {
//           email: email,
//           password: password,
//         },
//       })
//       //DB에 유저 정보가 없을시
//       if (!loginuser) {
//         res.status.json({ message: 'login unsuccessed' })
//       }

//       //DB에 유저정보가 있을시 jwt토큰을 cookie에 담아서보내줌
//       else {
//         const { username, email, description } = loginuser
//         const jwt = makejwt({ username, email, description })
//         console.log('jwt토큰코는', jwt)
//         res
//           // .cookie('jwt', jwt, {
//           //   sameSite: 'None',
//           //   secure: true,
//           //   httpOnly: true,
//           // })
//           .status(200)
//           .json({
//             message: 'login successed',
//             data: { authorization: jwt },
//             userInfo: loginuser,
//           })
//       }
//     },
//   },
// }
const models = require('../models')
const { users } = require('../models')
const { makejwt, solveToken } = require('./function')
const whoRU = function (withBearer) {
  const token = withBearer.split(' ')[1]
  const user_id = solveToken(token)
  return user_id
}

const { Op } = require('sequelize')
const stacks = require('../models/stacks')
const lodash = require('lodash')

module.exports = {
  users: {
    get: async (req, res) => {
      const rtoken = req.cookies.jwt
      const decoded = solveToken(rtoken)
      console.log('eeeeeeeeeeeeeeeeeeee', decoded)
      const solve = await users.findOne({
        where: { id: decoded.id },
      })
      const userInfo = solve
      console.log(userInfo.dataValues)
      // const stacks = await models.stacks.findAll({
      //   attributes: ['id', 'name'],
      //   where: {
      //     id: {
      //       [Op.or]: solve.stacks,
      //     },
      //   },
      // })

      // solve['stacks'] = stacks
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
      console.log('ddddssdsfsdfsdfsfs', req.cookies.token)
      console.log('ddddssdsfsdfsdfsfs', req.cookies.jwt)
      console.log('ddddssdsfsdfsdfsfs', req.body)

      //test
      // newInfo = {
      //   username: '준우',
      //   description: '이보게 내가 개발자가 될 상인가?',
      //   stacks: [1, 2, 3],
      // }
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
        await models.user_stacks.destroy({ where: { user_id: userId } })
        const stackobj = {}
        const newarr = []
        newInfo.stacks.forEach((el) => {
          stackobj['user_id'] = userId
          stackobj['stack_id'] = el
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
      //  const Token = req.cookies.token

      // const solve = solveToken(hoToken)
      // const userInfo = await models.users.findAll({
      //   where: { id: solve.id },
      // })
      // if (userInfo) {
      //   res
      //   // .cookie('token', '', {
      //   //   sameSite: 'None',
      //   //   httpOnly: true,
      //   //   secure: true,
      //   //
      //   res.clearCookie('jwt')
      //   res.status(200).json({ message: 'logout successed' })
      // }
      res.status(205).clearCookie('jwt').send('Logged out successfully')
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
      // models.user_stacks.({

      // })
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
        // const userstack = await models.user_stacks.findAll({
        //   attribute: ['stack_id'],
        //   where: { user_id: target.id }
        // })
        // console.log(target.id)
        // // console.log(userstack[0].dataValues)
        // // const stacks = await models.stacks.findAll({
        // //   attributes: ['id', 'name'],
        // //   where: {
        // //     id: {
        // //       [Op.or]: solve.stacks,
        // //     },
        // //   },
        // // }

        const { username, email, description, id } = target
        const jwt = makejwt({ id, username, email, description })

        res
          .cookie('jwt', jwt, {
            sameSite: 'None',
            secure: true,
            httpOnly: true,
          })
          .cookie('id', id, {
            sameSite: 'None',
            secure: true,
            httpOnly: true,
          })
          .status(200)
          .json({
            message: 'login successed',
            data: { authorization: jwt },
          })
      }
    },
  },
}

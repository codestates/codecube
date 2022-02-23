const models = require('../models')
const { users } = require('../models')
const { makejwt, solveToken } = require('./function')
const { Op } = require('sequelize')
const lodash = require('lodash')

module.exports = {
  users: {
    get: async (req, res) => {
      //쿠키로 받은 Token을 함수를 사용해 디코딩한다.
      if (!req.cookies.jwt) {
        console.log('\n❗️ users(userInfo):\n 토큰정보를 확인할 수 없습니다.\n')
        return res.status(401).json({ message: 'invailid authorization' })
      }
      const token = req.cookies.jwt
      const decoded = solveToken(token)
      // 해독한 Token값중 Mypage를 구성하는 값들만 받아온다.
      const solve = await users.findOne({
        attributes: ['id', 'username', 'email', 'oauth', 'description'],
        raw: true,
        where: { id: decoded.id },
      })
      // 회원을 찾을수 없는경우 401을 응답한다.
      if (!solve) {
        console.log('\n❗️ users(userInfo):\n 잘못된 토큰입니다.\n')
        return res.status(401).json({ message: 'invalid authorization' })
      }
      //아니면 유저정보를 보내준다.
      else {
        //id값을 통해 유저의 stackIdf를 배열로 가져온다
        let stacklist = await models.user_stacks.findAll({
          raw: true,
          where: { userId: solve.id },
        })
        // 유저의 stack 목록을 확인 후 stack이 없을시 빈배열로 할당한다.
        stacklist = stacklist.map((el) => el.stackId)
        if (stacklist.length !== 0) {
          const stacks = await models.stacks.findAll({
            raw: true,
            attributes: ['id', 'name'],
            where: {
              id: {
                [Op.or]: stacklist,
              },
            },
          })
          solve.stacks = stacks
        } else {
          solve.stacks = []
        }
        console.log(
          `\n👍 users(userInfo):\n userId: ${solve.id} ${solve.username}님의 정보를 전송하였습니다.\n`
        )
        return res.status(200).json({ data: solve })
      }
    },
    //회원탈퇴
    delete: async (req, res) => {
      const Token = req.cookies.jwt
      const userInfo = solveToken(Token)
      // 탈퇴하려는 가입정보가 Null일경우 분기
      if (!Token) {
        console.log('\n❗️ users(회원탈퇴):\n 토큰정보를 확인할 수 없습니다.\n')
        return res.status(401).json({ message: 'invalid token' })
      }
      if (!userInfo) {
        console.log(
          '\n❗️ users(회원탈퇴):\n 토큰에 해당하는 유저를 확인할 수 없습니다.\n'
        )
        return res.status(401).json({ message: 'User not found' })
      } else {
        // 삭제요청한 유저가 가지고 있는 stackId값을 가지고옴
        const DeleteUser = await models.user_stacks.findAll({
          raw: true,
          where: { userId: userInfo.id },
        })
        // JOIN테이블의 유저정보를 삭제하기전 유저의 stack배열이 비었는지 확인함
        if (DeleteUser.length !== 0) {
          await models.user_stacks.destroy({ where: { userId: userInfo.id } })
          console.log(
            `\n👍 users(회원탈퇴):\n userId: ${userInfo.id}의 기술스택 데이터가 삭제되었습니다.\n`
          )
        }
        await models.users.destroy({ where: { id: userInfo.id } })
        console.log(
          `\n👍 users(회원탈퇴):\n userId: ${userInfo.id}의 유저정보 데이터가 삭제되었습니다.\n`
        )
        return res
          .status(200)
          .clearCookie('jwt', {
            domain: process.env.DOMAIN,
            secure: true,
            sameSite: 'none',
          })
          .json({ message: 'byebye' })
      }
    },
  },
  changeinfo: {
    put: async (req, res) => {
      const token = req.cookies.jwt
      const newInfo = req.body
      //요청정보가 없을시 분기처리
      if (!newInfo) {
        console.log(
          '\n❗️ users/changeinfo:\n 불충분한 회원정보수정 요청입니다.\n'
        )
        return res.status(400).json({ message: 'No info to update' })
      }
      //Token으로 사용자의 현재 정보를 찾는다.
      const userId = solveToken(token).id

      //access Token이 만료될 경우
      if (!userId) {
        console.log(
          '\n❗️ users/changeinfo:\n 토큰이 없거나 회원정보를 찾을 수 없습니다.\n'
        )
        return res.status(401).json({ message: 'invalid authorization' })
      } else {
        // user 정보 업데아트
        // JOIN테이블에 유저의 stack을 삭제한다.
        await models.user_stacks.destroy({ where: { userId } })
        console.log(
          `\n👍 users/changeinfo:\n userId: ${userId}의 기술스택 데이터가 삭제되었습니다.\n`
        )
        const stackobj = {}
        const newarr = []
        // 유저의 요청 stack이 빈배열일경우 분기처리
        if (newInfo.stacks.length !== 0) {
          newInfo.stacks.forEach((el) => {
            stackobj['userId'] = userId
            stackobj['stackId'] = el
            let element = lodash.cloneDeep(stackobj)
            newarr.push(element)
          })
          await models.user_stacks.bulkCreate(newarr)
          const newStacks = []
          newarr.map((el) => newStacks.push(el.stackId))
          console.log(
            `\n👍 users/changeinfo:\n userId: ${userId}의 기술스택 데이터가 stackId: ${newStacks}로 변경되었습니다.\n`
          )
        }
        // 전달받은 유저정보와 최신화된 스택정보를 업데이트한다.
        await models.users.update(newInfo, {
          where: {
            id: userId,
          },
        })
        console.log(
          `\n👍 users/changeinfo:\n userId: ${userId}의 유저정보가 정상적으로 변경되었습니다. \n details: `
        )
        console.log(newInfo, '\n')
        return res.status(200).json({
          message: 'successfully modified',
        })
      }
    },
  },
  logout: {
    get: async (req, res) => {
      //쿠키를 지운다.
      const userInfo = solveToken(req.cookies.jwt)
      if (!userInfo) {
        console.log(
          '\n❗️ users/logout:\n 토큰이 없거나 회원정보를 찾을 수 없습니다.\n'
        )
        return res.status(401).json({ message: 'invalid token' })
      }
      console.log(
        `\n👍 users/logout:\n userId: ${userInfo.id} ${userInfo.username}님이 로그아웃 하였습니다.\n`
      )
      return res
        .status(200)
        .clearCookie('jwt', {
          domain: process.env.DOMAIN,
          secure: true,
          sameSite: 'none',
        })
        .send('Logged out successfully')
    },
  },
  signup: {
    post: async (req, res) => {
      //req.body를 통해 가입정보를 구조분해를 통해 나눔
      const { email, password, username, description, stacks } = req.body

      //email이 겹치는 요소 users테이블에서 확인(중복확인)
      const IDcheck = await models.users.findOne({
        raw: true,
        attributes: ['email'],
        where: { email: email },
      })
      //겹치는 email이 없다면 IDcheck는 빈 변수로 분기
      if (!IDcheck) {
        // users 테이블에 구조분해한 req.body값들을 할당
        await models.users
          .create({
            email: email,
            password: password,
            username: username,
            description: description,
            oauth: 0,
          })
          .then((data) => {
            const userInfo = data.dataValues
            console.log(
              '\n👍 users/signup:\n userId:',
              userInfo.id,
              ' ',
              userInfo.username,
              '님이 회원가입 하였습니다. \n'
            )
          })
        // join테이블에 할당하기 위해 방금 작성한 유저정보를 구한다.(중복확인을 거친 email을 사용함)
        // 출력예시::: { id : 2}
        const newuserInfo = await models.users.findOne({
          attributes: ['id', 'username', 'email', 'oauth', 'description'],
          raw: true,
          where: { email },
        })
        // JOIN테이블에 userId를 활용해서 stackID값을 테이블에 기입(입력된 stack값이 비었을경우 빈 배열을 입력하기위해 []할당)
        if (stacks.length !== 0) {
          const stackobj = {}
          const InputStackList = []
          stacks.forEach((el) => {
            stackobj['userId'] = newuserInfo.id
            stackobj['stackId'] = el
            let element = lodash.cloneDeep(stackobj)
            //출력예시 ::: InputStackList = [{userId: 1 , stackId: 3} , { userId:1 , stackId:5}]
            InputStackList.push(element)
          })
          //JOIN테이블에 일괄 생성
          const createdStacks = []
          InputStackList.map((el) => createdStacks.push(el.stackId))
          await models.user_stacks.bulkCreate(InputStackList).then(() => {
            console.log(
              `\n👍 users/signup:\n, userId: ${newuserInfo.id}의 기술스택 stackId: ${createdStacks} 이 추가되었습니다.`
            )
          })
        }
        //회원가입시 jwt 토큰을 만들어 cookie로 전송한다.
        const jwt = makejwt({
          id: newuserInfo.id,
          username,
          email,
        })
        return res
          .cookie('jwt', `bearer ${jwt}`, {
            domain: process.env.DOMAIN,
            secure: true,
            sameSite: 'none',
          })
          .status(201)
          .json({
            message: 'signup successed',
          })
      } else {
        console.log('\n❗️ users/signup:\n 이미 가입된 회원 이메일입니다.\n')
        res.status(400).json({ message: 'Already existing email' })
      }
    },
  },
  login: {
    post: async (req, res) => {
      // body를 통해 email과 password 값 전달 , 구조분해로 변수에 할당
      const userInfo = req.body
      const { email, password } = userInfo
      // users테이블에서 유저정보를 확인 후 가져온다.
      const loginuser = await models.users.findOne({
        raw: true,
        where: {
          email: email,
          password: password,
        },
      })
      // DB에서 회원정보가 없을경우 null값을 출력
      if (!loginuser) {
        console.log('\n❗️ users/login:\n 회원정보를 찾을 수 없습니다.\n')
        return res.status(400).json({ message: 'login unsuccessed' })
      }
      //DB에 유저정보가 있을시 jwt토큰을 cookie에 담아서보내줌
      else {
        // 찾은 회원정보로 Token을 발급한다.
        const { id, username, email } = loginuser
        const jwt = makejwt({ id, username, email })
        console.log(
          `\n👍 users/login:\n userId: ${id} ${username}님의 로그인 토큰이 발행되었습니다.\n`
        )
        // 쿠키로 Token과 id를 전달한다.
        return res
          .cookie('jwt', `bearer ${jwt}`, {
            domain: process.env.DOMAIN,
            secure: true,
            sameSite: 'none',
          })
          .status(200)
          .json({
            userInfo: loginuser,
            message: 'login successed',
          })
      }
    },
  },
}

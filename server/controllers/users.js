const models = require('../models')
const { users } = require('../models')
const { makejwt, solveToken } = require('./function')
const { Op } = require('sequelize')
const lodash = require('lodash')
const whoRU = function (withBearer) {
  const token = withBearer.split(' ')[1]
  const userInfo = solveToken(token)
  return userInfo
}

module.exports = {
  users: {
    get: async (req, res) => {
      //쿠키로 받은 Token을 함수를 사용해 디코딩한다.
      if (!req.cookies.jwt) {
        return res.status(401).json({ message: 'invailid authorization' })
      }

      const rtoken = req.cookies.jwt
      const decoded = whoRU(rtoken)
      // 해독한 Token값중 Mypage를 구성하는 값들만 받아온다.
      const solve = await users.findOne({
        attributes: ['id', 'username', 'email', 'description', 'image'],
        raw: true,
        where: { id: decoded.id },
      })

      // 회원을 찾을수 없는경우 401을 응답한다.
      if (!solve) {
        res.status(401).json({ message: 'invalid authorization' })
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

        res.status(200).json({ data: solve })
      }
    },
    //회원탈퇴
    delete: async (req, res) => {
      const Token = req.cookies.jwt
      const userInfo = whoRU(Token)
      // 탈퇴하려는 가입정보가 Null일경우 분기

      if (!userInfo) {
        res.status(401).json({ message: 'no such info' })
      } else {
        // 삭제요청한 유저가 가지고 있는 stackId값을 가지고옴
        const DeleteUser = await models.user_stacks.findAll({
          raw: true,
          where: { userId: userInfo.id },
        })
        // JOIN테이블의 유저정보를 삭제하기전 유저의 stack배열이 비었는지 확인함
        if (DeleteUser.length !== 0) {
          await models.user_stacks.destroy({ where: { userId: userInfo.id } })
        }
        await models.users.destroy({ where: { id: userInfo.id } })
        res.clearCookie('id')
        res.status(200).clearCookie('jwt').json({ message: 'byebye' })
      }
    },
  },
  changeinfo: {
    put: async (req, res) => {
      console.log(req)
      const token = req.cookies.jwt
      const newInfo = req.body
      //요청정보가 없을시 분기처리
      if (!newInfo) {
        res.status(400).json({ message: 'invalid userinfo' })
      }
      //Token으로 사용자의 현재 정보를 찾는다.
      const userId = whoRU(token).id

      //access Token이 만료될 경우
      if (!userId) {
        res.status(401).json({ message: 'invalid authorization' })
      } else {
        // user 정보 업데아트
        // JOIN테이블에 유저의 stack을 삭제한다.
        await models.user_stacks.destroy({ where: { userId } })
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
        }
        // 전달받은 유저정보와 최신화된 스택정보를 업데이트한다.
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
      //쿠키를 지운다.
      res
        .status(200)
        .clearCookie('jwt')
        .clearCookie('id')
        .clearCookie('__gads')
        .send('Logged out successfully')
    },
  },
  signup: {
    post: async (req, res) => {
      //req.body를 통해 가입정보를 구조분해를 통해 나눔
      const { email, password, username, description, image, stacks } = req.body

      //email이 겹치는 요소 users테이블에서 확인
      const IDcheck = await models.users.findOne({
        raw: true,
        attributes: ['email'],
        where: { email: email },
      })
      //겹치는 email이 없다면 IDcheck는 빈 변수로 분기
      if (!IDcheck) {
        // users 테이블에 구조분해한 req.body값들을 할당
        await models.users.create({
          email: email,
          password: password,
          username: username,
          description: description,
          image: image,
        })
        // join테이블에 할당하기 위해 방금 작성한 유저정보를 구한다.(중복확인을 거친 email을 사용함)
        // 출력예시::: { id : 2}
        const newuserInfo = await models.users.findOne({
          attributes: ['id', 'username', 'email', 'description', 'image'],
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
            console.log(InputStackList)
          })
          //JOIN테이블에 일괄 생성
          await models.user_stacks.bulkCreate(InputStackList)
        }
        //회원가입시 jwt 토큰을 만들어 cookie로 전송한다.
        const jwt = makejwt({
          id: newuserInfo.id,
          username,
          email,
          description,
        })

        res
          .cookie('id', newuserInfo.id)
          .cookie('jwt', `bearer ${jwt}`, {
            httpOnly: true,
           sameSite:'none'
          })
          .status(201)
          .json({
            userInfo: newuserInfo,
            message: 'signup successed',
          })
      } else {
        res.status(400).json({ message: '이미 있는 아이디 입니다' })
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
        attributes: ['id', 'username', 'email', 'description', 'image'],
        raw: true,
        where: {
          email: email,
          password: password,
        },
      })
      // DB에서 회원정보가 없을경우 null값을 출력
      if (!loginuser) {
        res.status(400).json({ message: 'login unsuccessed' })
      }
      //DB에 유저정보가 있을시 jwt토큰을 cookie에 담아서보내줌
      else {
        // 찾은 회원정보로 Token을 발급한다.
        console.log(loginuser)
        const { id, username, email } = loginuser
        const jwt = makejwt({ id, username, email })

        // 쿠키로 Token과 id를 전달한다.
        res
          .cookie('jwt', `bearer ${jwt}`, {
            httpOnly: true,
            sameSite:'none'
          })
          .cookie('id', loginuser.id, {
            httpOnly: true,
           sameSite:'none'
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

const models = require('../models')
const { solveToken, makejwt } = require('./function')
const whoRU = function (withBearer) {
  const token = withBearer.split(' ')[1]
  const user_id = solveToken(token).id
  return user_id
}

module.exports = {
  project: {
    get: async (req, res) => {
      //전체 개시글 요청
      const firstList = await models.projects.findAll()
      const finalList = []
      for (let i = 0; i < firstList.length; i++) {
        const title = firstList[i].dataValues.title
        const project_id = firstList[i].dataValues.id
        const confirmed = await models.project_users.findAndCountAll({
          where: { project_id: project_id, join: 1 },
        })
        finalList.push({ title: title, confirmed: confirmed.count })
      }
      res.status(200).json({ message: 'ok', list: finalList })
    },
    delete: async (req, res) => {
      //1. 일단 게시글 지우기
      const project_id = req.params.postId
      const target = await models.projects.findOne({
        where: { id: project_id },
      })
      if (!target) {
        return res.status(404).json({ message: 'Not Found' })
      }
      target.destroy()
      //2. project_users에서 해당 게시글 id 다찾아서 지우기
      const removeList = await models.project_users.findAll({
        where: { project_id: project_id },
      })
      for (let i = 0; i < removeList.length; i++) {
        const target = removeList[i]
        target.destroy()
      }
      res.status(200).json({ message: 'successfully deleted' })
    },
    put: async (req, res) => {
      const { title, content, image } = req.body
      const user_id = whoRU(req.headers.authorization)
      if (!user_id) {
        return res.status(401).json({ message: 'invalid authorization' })
      }
      const project = await models.projects.findOne({
        where: { user_id: user_id },
      })
      await project.update({ title: title, content: content, image: image })
      res.status(200).json({ message: 'successfully modified' })
    },
  },
  post: {
    //게시글 작성
    post: async (req, res) => {
      const user_id = whoRU(req.headers.authorization)
      if (!user_id) {
        return res.status(401).json({ message: 'invalid authorization' })
      }
      const isValid = await models.projects.findOne({
        where: { user_id: user_id },
      })
      if (isValid) {
        return res.status(400).json({ message: 'post already exists' })
      }
      const { title, content, image } = req.body
      await models.projects.create({
        user_id: user_id,
        title: title,
        content: content,
        image: image,
        start: 0,
        done: 0,
      })
      res.status(201).json({ message: 'successfully created' })
    },
    //특정 게시글 요청
    get: async (req, res) => {
      // console.log(req.params)
      const project_id = req.params.postId
      const target = await models.projects.findOne({
        where: { id: project_id },
      })
      if (!target) {
        return res.status(404).json({ message: 'Not Found' })
      }
      const { title, content, image } = target.dataValues
      //1. 프로젝트 id로 해당 데이터들을 pro-user 테이블에서 찾기
      const firstList = await models.project_users.findAll({
        where: { project_id: project_id },
      })
      //2. 그 찾은 사람들 중에 join값이 0인 사람들 찾기
      let finalList = []
      for (let i = 0; i < firstList.length; i++) {
        // console.log(firstList[i].dataValues)
        if (firstList[i].dataValues.join === 0) {
          const userInfo = await models.users.findOne({
            where: { id: firstList[i].dataValues.user_id },
          })
          // console.log('userInfo:' + JSON.stringify(userInfo))
          finalList.push({ username: userInfo.username, image: userInfo.image })
        }
      }
      console.log(finalList)

      res.status(200).json({
        postInfo: {
          title: title,
          content: content,
          image: image,
          waiting: finalList,
        },
      })
    },
  },
  private_post: {
    get: async (req, res) => {
      //헤더일지,쿠키일지 몰라서 일단 여기 넣어둔 더미데이터로 테스트 해볼게요
      const user_id = whoRU(req.headers.authorization)
      //1.이 사람 id로 된 글이 하나라도 있으면 그 글을 팝업
      const target = await models.projects.findOne({
        where: { user_id: user_id },
      })
      if (target) {
        const project_id = target.dataValues.id
        const confirmed = await models.project_users.findAndCountAll({
          where: { project_id: project_id },
        })
        return res.status(200).json({
          host: {
            title: target.dataValues.title,
            confirmed: confirmed.count,
          },
        })
      }
      //2. 없다면 참가한 리스트 표현
      //2-1. 내가 참가한 title부터 찾아서 적기
      const finalList = []
      const firstList = await models.project_users.findAll({
        where: { user_id: user_id },
      })
      // console.log(firstList)
      for (let i = 0; i < firstList.length; i++) {
        const project_id = firstList[i].dataValues.project_id
        // console.log(project_id)
        const titleJson = await models.projects.findOne({
          where: { id: project_id },
        })
        const title = titleJson.dataValues.title
        // console.log('title:' + title)
        const isConfirmedInt = firstList[i].dataValues.join
        let isConfirmed = false
        if (isConfirmedInt === 1) {
          isConfirmed = true
        }
        const isStartTest = await models.projects.findOne({
          id: firstList[i].dataValues.project_id,
        })
        const isStartInt = isStartTest.dataValues.start
        let isStart = false
        if (isStartInt === 1) {
          isStart = true
        }
        //요기만 다시하면됨!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const confirmedSeq = await models.project_users.findAndCountAll({
          where: {
            project_id: project_id,
            join: 1,
          },
        })
        console.log('count:' + confirmedSeq.count)
        finalList.push({
          title: title,
          confirmed: confirmedSeq.count,
          isStart: isStart,
          isConfirmed: isConfirmed,
        })
      }
      //2-2. confirmed의 인원이 몇명인지 찾기

      //2-3. isStart 여부 - projects테이블에서 project_id로 여부 확인하면 됨

      //2-4. join값이 1인지 0인지
      res.status(200).json({ guest: finalList })
    },
  },
}

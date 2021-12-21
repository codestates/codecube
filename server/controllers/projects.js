const { Sequelize } = require('../models')
const Op = Sequelize.Op
const models = require('../models')
const { solveToken, makejwt } = require('./function')
const lodash = require('lodash')
const myProjectsForm = {
  host: {
    projectId: '',
    start: 0,
    done: 0,
  },
  guest: {
    wishList: [],
    confirmed: {
      projectId: '', //
      title: '',
      start: 0,
      done: 0,
    },
  },
}

const whoRU = function (withBearer) {
  const token = withBearer.split(' ')[1]
  const userInfo = solveToken(token)
  return userInfo
}

module.exports = {
  project: {
    get: async (req, res) => {
      //전체 개시글 요청
      const finalList = []
      const confirmedProjectIds = []
      // const firstList = await models.projects.findAll({
      //   include: [
      //     {
      //       model: models.users,
      //       require: true,
      //     },
      //     {
      //       model: models.project_users,
      //       where: { join: 1 },
      //     },
      //   ],
      //   raw: true,
      // })
      // console.log(firstList)
      // firstList.map((el) => {
      //   const obj = {}
      //   obj.title = el.title
      //   obj.projectId = el.id
      //   confirmedProjectIds.push(el.id)
      //   let element = lodash.cloneDeep(obj)
      //   finalList.push(element)
      // })
      // console.log(confirmedProjectIds)
      // confirmedProjectIds.map(el=>)
      // const confirmed = models.project_users.findAndCountAll({
      //   raw: true,
      //   where: { projectId: el.id, join: 1 },
      // })
      // obj.confirmed = confirmed.count


      res.status(200).json({ message: 'ok', list: finalList })
    },
    delete: async (req, res) => {
      //1. 일단 게시글 지우기
      console.log(req.params)
      const projectId = req.params.projectId
      const target = await models.projects.findOne({
        where: { id: projectId },
      })
      if (!target) {
        return res.status(404).json({ message: 'Not Found' })
      }
      target.destroy()
      //2. project_users에서 해당 게시글 id 다찾아서 지우기
      const removeList = await models.project_users.findAll({
        where: { projectId: projectId },
      })
      for (let i = 0; i < removeList.length; i++) {
        const target = removeList[i]
        target.destroy()
      }
      res.status(200).json({ message: 'successfully deleted' })
    },
    put: async (req, res) => {
      // console.log(req.body)
      const { title, content, image } = req.body
      // !!
      const userId = whoRU(req.headers.authorization)
      // !!
      if (!userId) {
        return res.status(401).json({ message: 'invalid authorization' })
      }
      const project = await models.projects.findOne({
        where: { userId: userId },
      })
      await project.update({ title: title, content: content, image: image })
      res.status(200).json({ message: 'successfully modified' })
    },
  },
  post: {
    //게시글 작성
    post: async (req, res) => {
      // !!
      const userId = whoRU(req.headers.authorization)
      // !!
      if (!userId) {
        return res.status(401).json({ message: 'invalid authorization' })
      }
      const isValid = await models.projects.findOne({
        where: { userId: userId },
      })
      if (isValid) {
        return res.status(400).json({ message: 'post already exists' })
      }
      const { title, content, image } = req.body
      await models.projects.create({
        userId: userId,
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
      const projectId = req.params.projectId
      const target = await models.projects.findOne({
        where: { id: projectId },
      })

      if (!target) {
        return res.status(404).json({ message: 'Not Found' })
      } else {
        res.json(target.dataValues)
      }

      const { title, content, image } = target.dataValues
      //1. 프로젝트 id로 해당 데이터들을 pro-user 테이블에서 찾기
      const firstList = await models.project_users.findAll({
        where: { projectId: projectId },
      })
      //2. 그 찾은 사람들 중에 join값이 0인 사람들 찾기
      let finalList = []
      for (let i = 0; i < firstList.length; i++) {
        // console.log(firstList[i].dataValues)
        if (firstList[i].dataValues.join === 0) {
          const userInfo = await models.users.findOne({
            where: { id: firstList[i].dataValues.userId },
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
      const { id: userId } = whoRU(req.cookies.jwt)
      const target = await models.projects.findOne({
        where: { userId },
      })

      if (target) {
        console.log('host!!')
        const { id: projectId, start, done } = target.dataValues
        return res
          .status(200)
          .json({ ...myProjectsForm, ...{ host: { projectId, start, done } } })
      } else {
        console.log('guest!!')
        // * guest인 경우
        const inList = await models.project_users.findAll({
          raw: true,
          include: [models.projects],
          where: { userId },
        })

        const cnt = []
        const pending = inList.map((v) => {
          cnt.push(v.projectId)
          return {
            userId: v.userId,
            projectId: v.projectId,
            title: v['project.title'],
          }
        })

        res.json({
          ...myProjectsForm,
          ...{ guest: { wishList: pending, confirmed: {} } },
        })
      }
    },
  },
}

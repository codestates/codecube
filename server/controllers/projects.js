const { Sequelize } = require('../models')
const Op = Sequelize.Op
const models = require('../models')
const { solveToken, makejwt } = require('./function')

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
      const firstList = await models.projects.findAll()
      const finalList = []
      for (let i = 0; i < firstList.length; i++) {
        const title = firstList[i].dataValues.title
        const projectId = firstList[i].dataValues.id
        const confirmed = await models.project_users.findAndCountAll({
          where: { projectId: projectId, join: 1 },
        })
        finalList.push({
          title,
          projectId,
          confirmed: confirmed.count,
        })
      }
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

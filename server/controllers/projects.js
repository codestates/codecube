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

function whoRU(withBearer) {
  const token = withBearer.split(' ')[1]
  const userInfo = solveToken(token)
  return userInfo
}

module.exports = {
  project: {
    get: async (req, res) => {
      //전체 개시글 요청
      //title, projectId, confirmed list 구하기
      const finalList = []
      const confirmedProjectIds = []
      const firstList = await models.projects.findAll({
        include: {
          model: models.users,
          require: true,
        },
        raw: true,
      })
      firstList.map((el) => {
        const obj = {}
        obj.title = el.title
        obj.projectId = el.id
        confirmedProjectIds.push(el.id)
        let element = lodash.cloneDeep(obj)
        finalList.push(element)
      })
      //confirmed list 를 기반으로 join 1인 인원수 찾기
      await Promise.all(
        confirmedProjectIds.map(async (el, idx) => {
          let confirmed = await models.project_users.findAndCountAll({
            raw: true,
            where: { projectId: el, join: 1 },
          })
          finalList[idx]['confirmed'] = confirmed.count
        })
      )
      // console.log(finalList)
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
        raw: true,
      })
      // console.log(target)
      if (!target) {
        return res.status(404).json({ message: 'Not Found' })
      } else {
        const waiting = await models.project_users.findAndCountAll({
          where: { projectId },
        })
        const { title, content, image, start, done, createdAt, updatedAt } =
          target
        res.status(200).json({
          projectInfo: {
            title,
            content,
            image,
            start,
            done,
            createdAt,
            updatedAt,
            waiting: waiting.count,
          },
        })
      }
    },
  },
  private_post: {
    get: async (req, res) => {
      if (!req.cookies.jwt) {
        return res.status(302).location('/')
      }
      const { id: userId } = whoRU(req.cookies.jwt)

      const target = await models.projects.findOne({
        raw: true,
        where: { userId },
      })

      if (target) {
        console.log('host!!')
        console.log(target)
        const { id: projectId, start, done, title } = target
        return res.status(200).json({
          ...myProjectsForm,
          ...{ host: { projectId, start, done, title } },
        })
      } else {
        console.log('guest!!')
        // * guest인 경우
        const inList = await models.project_users.findAll({
          raw: true,
          include: [models.projects],
          where: { userId },
        })
        console.log(inList[0]['project.title'])
        //대기중 글 개수가 1개일 때
        if (inList.length === 1) {
          const { id, userId, projectId, join } = inList[0]
          //confirmed일때
          if (join === 1) {
            const { start, done } = await models.projects.findOne({
              where: { id: projectId },
              raw: true,
            })
            const confirmed = await models.project_users.findAndCountAll({
              where: { projectId, join: 1 },
            })
            const wishListObj = {
              projectId,
              title: inList[0]['project.title'],
              confirmed: confirmed.count,
              start,
              done,
            }
            // console.log(
            //   '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
            // )
            // console.log(confirmed.count)
            // console.log(
            //   '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
            // )
            return res.status(200).json({
              host: { projectId: '', start: 0, done: 0 },
              guest: {
                //???? 위시리스트에 뭘넣어야 하는거지?
                wishList: [],
                confirmed: {
                  projectId,
                  title: inList[0]['project.title'],
                  start,
                  done,
                },
              },
            })
            //waiting일때

            //////만약에 confirmed 일때도 웨이팅에 꼭 뭔갈 넣어줘야한다면 waiting이랑 뭐가다르지?
          } else {
            const { start, done } = await models.projects.findOne({
              where: { id: projectId },
              raw: true,
            })
            const confirmed = await models.project_users.findAndCountAll({
              where: { projectId, join: 1 },
            })
            const wishListObj = {
              projectId,
              title: inList[0]['project.title'],
              confirmed: confirmed.count,
              start,
              done,
            }
            console.log(
              '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
            )
            console.log(confirmed)
            console.log(
              '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
            )
            return res.status(200).json({
              host: { projectId: '', start: 0, done: 0 },
              guest: {
                //???? 위시리스트에 뭘넣어야 하는거지?
                wishList: [wishListObj],
                confirmed: {},
              },
            })
          }
          //여러개일때
        } else {
          const projectIds = []
          const pending = inList.map((v) => {
            projectIds.push(v.projectId)
            return {
              userId: v.userId,
              projectId: v.projectId,
              title: v['project.title'],
            }
          })
          // console.log('projectIds:', projectIds)
          await Promise.all(
            projectIds.map(async (el, idx) => {
              const confirmed = await models.project_users.findAndCountAll({
                where: { projectId: el, join: 1 },
              })
              // console.log('cfd:', confirmed)
              pending[idx]['confirmed'] = confirmed.count
            })
          )
          res.json({
            ...myProjectsForm,
            ...{ guest: { wishList: pending, confirmed: {} } },
          })
        }
      }
    },
  },
}

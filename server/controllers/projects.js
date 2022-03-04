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
        },
        raw: true,
        where: { done: 0 },
      })
      firstList.map((el) => {
        const obj = {}
        obj.title = el.title
        obj.projectId = el.id
        obj.intro = el.intro
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
      if (!finalList) {
        console.log(
          '\n❗️ projects(공개게시판):\n DB에서 게시글 조회를 할 수 없습니다.\n'
        )
      }
      console.log(
        '\n👍 projects(공개게시판):\n 총',
        finalList.length,
        '개의 게시글 정보를 전송하였습니다.\n'
      )
      return res.status(200).json({ message: 'ok', list: finalList })
    },
    delete: async (req, res) => {
      //1. 일단 게시글 지우기
      const projectId = req.params.projectId
      const target = await models.projects.findOne({
        where: { id: projectId },
        raw: true,
      })
      if (!target) {
        console.log(
          '\n❗️ projects/delete:\n DB에서 게시글 조회를 할 수 없습니다.\n'
        )
        return res.status(404).json({ message: 'Not Found' })
      }
      target.destroy()
      //❗️❗️ 실제로 클라이언트에서 기능 만들고 테스트해볼것
      console.log(
        '\n👍  projects/delete:\n projectId:',
        target.id,
        target.title,
        '게시글을 삭제하였습니다.\n'
      )
      //❗️❗️
      //2. project_users에서 해당 게시글 id 다찾아서 지우기
      const removeList = await models.project_users.findAll({
        where: { projectId: projectId },
      })
      for (let i = 0; i < removeList.length; i++) {
        const target = removeList[i]
        target.destroy()
        if (!target) {
          console.log(
            '\n❗️ projects/delete:\n project_users에서 projectId:',
            projectId,
            '게시글을 조회 할 수 없습니다.\n'
          )
        }
      }
      console.log(
        '\n👍  projects/delete:\n project_users에서 projectId:',
        projectId,
        '게시글을 삭제하였습니다.\n'
      )
      return res.status(200).json({ message: 'successfully deleted' })
    },
    put: {
      changeContent: async (req, res) => {
        //❗️❗️ 실제로 클라이언트에서 기능 만들고 테스트해볼것
        const { title, content, image } = req.body
        const { id: userId } = solveToken(req.cookies.jwt)
        if (!userId) {
          console.log(
            '\n❗️ projects/changeContent:\n 토큰이 없거나 userId:',
            userId,
            '를 조회 할 수 없습니다.\n'
          )
          return res.status(401).json({ message: 'invalid authorization' })
        }
        const project = await models.projects.findOne({
          where: { userId: userId },
          raw: true,
        })
        if (!project) {
          console.log(
            '\n❗️ projects/changeContent:\n userId:',
            userId,
            '가 작성한 게시글이 없습니다.\n'
          )
        }
        await project
          .update({ title: title, content: content })
          .then((data) => {
            console.log(
              '\n👍 projects/changeContent:\n projectId:',
              project.id,
              '의 정보를 성공적으로 변경하였습니다.\n'
            )
          })
          .catch((err) => {
            console.log('\n❗️ projects/changeContent:\n err:', err, '\n')
          })
        return res.status(200).json({ message: 'successfully modified' })
        //❗️❗️
      },
      start: async (req, res) => {
        const projectId = req.params.projectId
        const project = await models.projects.findOne({
          where: { id: projectId },
          raw: true,
        })
        if (!project) {
          console.log(
            '\n❗️ projects/start:\n projectId:',
            projectId,
            '를 DB에서 조회할 수 없습니다.\n'
          )
        }
        if (project.start === 1 || project.done === 1) {
          if (project.start === 1) {
            console.log(
              '\n❗️ projects/start:\n projectId:',
              projectId,
              '는 이미 시작한 프로젝트입니다.\n'
            )
          }
          if (project.done === 1) {
            console.log(
              '\n❗️ projects/start:\n projectId:',
              projectId,
              '는 이미 완료된 프로젝트입니다.\n'
            )
          }
          return res
            .status(400)
            .json({ message: 'This project has already been started or done' })
        }
        const newProject = await models.projects
          .update({ start: 1 }, { where: { id: projectId }, raw: true })
          .then((data) => {
            console.log(
              '\n👍 projects/start:\n projectId:',
              projectId,
              '가 시작되었습니다.\n'
            )
            return res.status(200).json({ message: 'project started' })
          })
          .catch((err) => {
            console.log('\n❗️ projects/start:\n err:', err, '\n')
          })
      },
      done: async (req, res) => {
        const projectId = req.params.projectId
        const project = await models.projects.findOne({
          where: { id: projectId },
          raw: true,
        })
        if (!project) {
          console.log(
            '\n❗️ projects/done:\n projectId:',
            projectId,
            '를 DB에서 조회할 수 없습니다.\n'
          )
        }
        if (project.start !== 1) {
          console.log(
            '\n❗️ projects/done:\n projectId:',
            projectId,
            '는 아직 시작하지 않은 프로젝트입니다.\n'
          )
          return res
            .status(400)
            .json({ message: 'This project has to be started first' })
        }
        if (project.done === 1) {
          console.log(
            '\n❗️ projects/done:\n projectId:',
            projectId,
            '는 이미 완료된 프로젝트입니다.\n'
          )
          return res
            .status(400)
            .json({ message: 'This project has already been done' })
        }
        const newProject = await models.projects
          .update({ done: 1 }, { where: { id: projectId }, raw: true })
          .then((data) => {
            console.log(
              '\n👍 projects/done:\n projectId:',
              projectId,
              '가 완료되었습니다.\n'
            )
            return res.status(200).json({ message: 'project done' })
          })
          .catch((err) => {
            console.log('\n❗️ projects/done:\n err:', err, '\n')
          })
      },
    },
  },
  post: {
    //게시글 작성
    post: async (req, res) => {
      // !!
      const { id: userId, username } = solveToken(req.cookies.jwt)
      // !!
      if (!userId) {
        console.log(
          '\n❗️ projects/post:\n 토큰이 없거나 userId:',
          userId,
          '를 조회 할 수 없습니다.\n'
        )
        return res.status(401).json({ message: 'invalid authorization' })
      }
      const isValid = await models.projects.findOne({
        where: { userId },
        raw: true,
      })
      if (isValid) {
        console.log(
          '\n❗️ projects/post:\n userId:',
          userId,
          username,
          '님이 작성한 게시글이 이미 존재합니다.\n'
        )
        return res.status(400).json({ message: 'post already exists' })
      }
      const { title, content, image, intro } = req.body
      await models.projects
        .create(
          {
            userId: userId,
            title: title,
            content: content,
            intro: intro,
            image: image,
            start: 0,
            done: 0,
          },
          { raw: true }
        )
        .then((data) => {
          console.log(
            '\n👍 projects/post:\n 게시글 projectId:',
            data.id,
            data.title,
            '가 작성되었습니다.\n'
          )
          return res.status(201).json({ message: 'successfully created' })
        })
        .catch((err) => {
          console.log('\n❗️ projects/post:\n err:', err, '\n')
        })
    },
    //특정 게시글 요청
    get: async (req, res) => {
      const projectId = req.params.projectId
      const target = await models.projects.findOne({
        where: { id: projectId },
        raw: true,
      })
      if (!target) {
        console.log(
          '\n❗️ projects(특정게시글):\n projectId:',
          projectId,
          '를 DB에서 조회할 수 없습니다.\n'
        )
        return res.status(404).json({ message: 'Not Found' })
      } else {
        const waiting = await models.project_users
          .findAndCountAll({
            where: { projectId },
            raw: true,
          })
          .then((data) => {
            const { title, content, image, start, done, createdAt, updatedAt } =
              target
            console.log(
              '\n👍 projects(특정게시글):\n projectId:',
              projectId,
              title,
              '의 게시글 정보를 전송하였습니다.\n'
            )
            return res.status(200).json({
              projectInfo: {
                title,
                content,
                image,
                start,
                done,
                createdAt,
                updatedAt,
                waiting: data.count,
              },
            })
          })
          .catch((err) => {
            console.log('\n❗️ projects(특정게시글):\n err:', err, '\n')
          })
      }
    },
  },
  private_post: {
    get: async (req, res) => {
      const { id: userId, username } = solveToken(req.cookies.jwt)
      if (!userId) {
        console.log(
          '\n❗️ projects/private_post:\n 토큰이 없거나 userId:',
          userId,
          '를 조회 할 수 없습니다.\n'
        )
        return res.status(400).json({ message: 'invalid authorization' })
      }
      // !

      const target = await models.projects.findOne({
        raw: true,
        where: { userId, done: 0 },
      })

      if (target) {
        // * host인 경우
        const { id: projectId, start, done, title } = target
        console.log(
          '\n👍 projects/private_post:\n 프로젝트 작성자 userId:',
          userId,
          '의 게시글 조회정보를 전송하였습니다.\n'
        )
        return res.status(200).json({
          ...myProjectsForm,
          ...{ host: { projectId, start, done, title } },
        })
      } else {
        // * guest인 경우
        const inList = await models.project_users.findAll({
          raw: true,
          include: {
            model: models.projects,
            where: {
              done: 0,
            },
          },
          where: { userId },
        })
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
            console.log(
              '\n👍 projects/private_post:\n 프로젝트 참가 희망자 userId:',
              userId,
              '의 게시글 조회정보를 전송하였습니다.\n'
            )
            return res.status(200).json({
              host: { projectId: '', start: 0, done: 0 },
              guest: {
                wishList: [],
                confirmed: {
                  projectId,
                  title: inList[0]['project.title'],
                  start,
                  done,
                },
              },
            })
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
              '\n👍 projects/private_post:\n 프로젝트 참가 희망자 userId:',
              userId,
              '의 게시글 조회정보를 전송하였습니다.\n'
            )
            return res.status(200).json({
              host: { projectId: '', start: 0, done: 0 },
              guest: {
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
          await Promise.all(
            projectIds.map(async (el, idx) => {
              const confirmed = await models.project_users.findAndCountAll({
                where: { projectId: el, join: 1 },
              })
              pending[idx]['confirmed'] = confirmed.count
            })
          )
          console.log(
            '\n👍 projects/private_post:\n 프로젝트 참가 희망자 userId:',
            userId,
            '의 게시글 조회정보를 전송하였습니다.\n'
          )
          return res.json({
            ...myProjectsForm,
            ...{ guest: { wishList: pending, confirmed: {} } },
          })
        }
      }
    },
  },
}

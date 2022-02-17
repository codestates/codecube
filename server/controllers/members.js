const models = require('../models')
const { solveToken, makejwt } = require('./function')
const whoRU = function (withBearer) {
  const token = withBearer.split(' ')[1]
  const userId = solveToken(token)
  return userId
}

module.exports = {
  delete: async (req, res) => {
    // console.log(req.params)
    const userId = req.params.userId
    const proId = req.params.projectId
    const target = await models.project_users.destroy({
      where: { userId: userId, projectId: proId },
    })

    if (!target) {
      res.status(404).json({ message: 'Not Found' })
    } else {
      await res.status(204).json({ message: 'member rejected' })
    }
  },
  put: {
    join: async (req, res) => {
      const { userId, projectId } = req.body
      //우선 현재 프로젝트 참여 인원이 몇명인지 확인하고 4명 이상이면 다찼다고 보내기
      const members = await models.project_users.findAndCountAll({
        where: {
          join: 1,
          projectId,
        },
      })
      if (members.count >= 4) {
        return res.status(400).json({ message: 'maximum member count' })
      }
      const project_users = await models.project_users.update(
        { join: 1 },
        {
          where: { userId: userId, projectId: projectId },
        }
      )
      if (!project_users) {
        return res.status(404).json({ message: 'Not Found' })
      } else {
        return res.status(204).json({ message: 'member accepted' })
      }
    },
    exclude: async (req, res) => {
      console.log(req.body)
      const { userId, projectId } = req.body
      const project_users = await models.project_users.update(
        { join: 0 },
        { where: { userId, projectId } }
      )
      if (!project_users) {
        return res.status(404).json({ message: 'Not Found' })
      } else {
        return res.status(204).json({ message: 'member moved to waiting list' })
      }
    },
  },
  post: async (req, res) => {
    const projectId = req.body.projectId
    const userId = 2
    const alreadyWaiting = await models.project_users.findOne({
      where: { userId: userId, projectId: projectId },
    })
    if (alreadyWaiting) {
      res.status(400).json({ message: 'already waiting in line' })
    } else {
      await models.project_users.create({
        userId: userId,
        projectId: projectId,
        join: 0,
      })
      res.status(201).json({ message: 'successfully applied' })
    }
  },
  get: async (req, res) => {
    const projectId = req.params.projectId
    const confirmedList = await models.project_users.findAll({
      raw: true,
      include: [models.users],
      where: { projectId },
    })

    const result = confirmedList.reduce(
      (acc, cur) => {
        if (cur.join > 0) {
          acc.confirmed.push({
            userId: cur.userId,
            username: cur['user.username'],
            projectId: cur['projectId'],
          })
        } else {
          acc.waiting.push({
            userId: cur.userId,
            username: cur['user.username'],
            projectId: cur['projectId'],
          })
        }
        return acc
      },
      {
        confirmed: [],
        waiting: [],
      }
    )
    res.json(result)
  },
}

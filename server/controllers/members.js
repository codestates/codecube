const models = require('../models')
const { solveToken, makejwt } = require('./function')
const whoRU = function (withBearer) {
  const token = withBearer.split(' ')[1]
  const userId = solveToken(token)
  return userId
}

module.exports = {
  delete: async (req, res) => {
    console.log(req.params)
    const userId = req.params.userId
    const target = await models.project_users.findOne({
      where: { userId: userId },
    })
    if (!target) {
      res.status(404).json({ message: 'Not Found' })
    } else {
      await target.destroy()
      await res.status(204).json({ message: 'member rejected' })
    }
  },
  put: async (req, res) => {
    const { userId, projectId } = req.body
    const project_users = await models.project_users.findOne({
      where: { userId: userId, projectId: projectId },
    })
    if (!project_users) {
      res.status(404).json({ message: 'Not Found' })
    } else {
      await project_users.update({ join: 1 })
      res.status(204).json({ message: 'member accepted' })
    }
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
            image: cur['user.image'],
          })
        } else {
          acc.waiting.push({
            userId: cur.userId,
            username: cur['user.username'],
            image: cur['user.image'],
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

const models = require('../models')
const { solveToken, makejwt } = require('./function')
const whoRU = function (withBearer) {
  const token = withBearer.split(' ')[1]
  const userId = solveToken(token).id
  return userId
}

module.exports = {
  delete: async (req, res) => {
    console.log(req.params)
    const userId = req.params.userId
    // const userId = whoRU(req.headers.authorization)
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
    const { userId, postId } = req.body
    const project_users = await models.project_users.findOne({
      where: { userId: userId, projectId: postId },
    })
    if (!project_users) {
      res.status(404).json({ message: 'Not Found' })
    } else {
      await project_users.update({ join: 1 })
      res.status(204).json({ message: 'member accepted' })
    }
  },
  post: async (req, res) => {
    const projectId = req.body.postId
    // const userId = whoRU(req.headers.authorization)
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
    const userId = whoRU(req.headers.authorization)
    // console.log(req.params)
    const projectId = req.params.postId
    const confirmedList = await models.project_users.findAll({
      where: { projectId: projectId },
    })
    const newList = []
    confirmedList.map((el) => newList.push(el.dataValues.userId))
    const finalList = []
    for (let i = 0; i < newList.length; i++) {
      const target = await models.users.findOne({ where: { id: newList[i] } })
      finalList.push({
        username: target.dataValues.username,
        image: target.dataValues.image,
      })
    }
    // console.log(finalList)
    res.status(200).json({
      confirmed: finalList,
    })
  },
}

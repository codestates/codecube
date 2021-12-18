const models = require('../models')
const { solveToken, makejwt } = require('./function')
const whoRU = function (withBearer) {
  const token = withBearer.split(' ')[1]
  const user_id = solveToken(token).id
  return user_id
}

module.exports = {
  delete: async (req, res) => {
    console.log(req.params)
    const user_id = req.params.userId
    // const user_id = whoRU(req.headers.authorization)
    const target = await models.project_users.findOne({
      where: { user_id: user_id },
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
      where: { user_id: userId, project_id: postId },
    })
    if (!project_users) {
      res.status(404).json({ message: 'Not Found' })
    } else {
      await project_users.update({ join: 1 })
      res.status(204).json({ message: 'member accepted' })
    }
  },
  post: async (req, res) => {
    const project_id = req.body.postId
    // const user_id = whoRU(req.headers.authorization)
    const user_id = 2
    const alreadyWaiting = await models.project_users.findOne({
      where: { user_id: user_id, project_id: project_id },
    })
    if (alreadyWaiting) {
      res.status(400).json({ message: 'already waiting in line' })
    } else {
      await models.project_users.create({
        user_id: user_id,
        project_id: project_id,
        join: 0,
      })
      res.status(201).json({ message: 'successfully applied' })
    }
  },
  get: async (req, res) => {
    const user_id = whoRU(req.headers.authorization)
    // console.log(req.params)
    const project_id = req.params.postId
    const confirmedList = await models.project_users.findAll({
      where: { project_id: project_id },
    })
    const newList = []
    confirmedList.map((el) => newList.push(el.dataValues.user_id))
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

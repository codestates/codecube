const models = require('../models')
const { solveToken, makejwt } = require('./function')
const jwtModules = require('./function')

module.exports = {
  delete: async (req, res) => {
    // console.log('working')
    // console.log(req.params)
    const withBearer = req.headers.authorization
    const token = withBearer.split(' ')[1]
    const user_id = solveToken(token).id
    // console.log(user_id)
    const target = await models.project_users.findOne({
      where: { user_id: user_id },
    })
    await target.destroy()
    console.log(target)
    await res.status(204).json({ message: 'member rejected' })
  },
  put: async (req, res) => {
    // console.log('body:' + req.body)
    // console.log('bearer:' + req.headers.authorization)
    const withBearer = req.headers.authorization
    const token = withBearer.split(' ')[1]
    // console.log(token)
    const { userId, postId } = req.body
    const project_users = await models.project_users.findOne({
      where: { user_id: userId, project_id: postId },
    })
    // console.log(project_users)
    await project_users.update({ join: 1 })
    res.status(204).json({ message: 'member accepted' })
  },
  post: (req, res) => {
    // console.log(req.body)
    const project_id = req.body.postId
    const withBearer = req.headers.authorization
    const token = withBearer.split(' ')[1]
    const user_id = solveToken(token).id
    models.project_users.create({
      user_id: user_id,
      project_id: project_id,
      join: 0,
    })
    res.status(201).json({ message: 'successfully applied' })
  },
  get: (req, res) => {
    res.status(200).json({
      confirmed: [
        { username: 'kim', image: 'URL' },
        { username: 'kim', image: 'URL' },
        { username: 'kim', image: 'URL' },
      ],
    })
  },
}

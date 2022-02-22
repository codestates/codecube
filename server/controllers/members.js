const models = require('../models')
const { solveToken, makejwt } = require('./function')
const whoRU = function (withBearer) {
  const token = withBearer.split(' ')[1]
  const userId = solveToken(token)
  return userId
}

module.exports = {
  delete: async (req, res) => {
    const userId = req.params.userId
    const proId = req.params.projectId
    const target = await models.project_users.destroy({
      where: { userId: userId, projectId: proId },
      raw: true,
    })
    if (!target) {
      console.log(
        `\n❗️ members/delete:\n projectId: ${proId}에서 userId: ${userId}를 찾지 못 해 멤버 제외가 거부되었습니다.\n`
      )
      res.status(404).json({ message: 'Not Found' })
    } else {
      console.log(
        `\n👍 members/delete:\n projectId: ${proId}에서 userId: ${userId}를 제외하였습니다.\n`
      )
      res.status(204).json({ message: 'member rejected' })
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
        raw: true,
      })
      const maxMemberCount = 4
      if (members.count >= maxMemberCount) {
        console.log(
          `\n❗️ members/join:\n projectId: ${projectId}에서 최대인원수(${maxMemberCount}명)을 넘어 userId: ${userId}의 참가 요청이 거부되었습니다.\n`
        )
        return res.status(400).json({ message: 'maximum member count' })
      }
      const project_users = await models.project_users.update(
        { join: 1 },
        {
          where: { userId: userId, projectId: projectId },
          raw: true,
        }
      )
      if (!project_users) {
        console.log(
          `\n❗️ members/join:\n projectId: ${projectId}에서 userId: ${userId}를 찾지 못 해 참가요청이 거부되었습니다.\n`
        )
        return res.status(404).json({ message: 'Not Found' })
      } else {
        console.log(
          `\n👍 members/join:\n projectId: ${projectId}에서 userId: ${userId}가 참가하였습니다.\n`
        )
        return res.status(204).json({ message: 'member accepted' })
      }
    },
    exclude: async (req, res) => {
      const { userId, projectId } = req.body
      const project_users = await models.project_users.update(
        { join: 0 },
        { where: { userId, projectId } }
      )
      if (!project_users) {
        console.log(
          `\n❗️ members/exclude:\n projectId: ${projectId}의 confirmed 리스트에서 userId: ${userId}를 찾지 못 해 제외 요청이 거부되었습니다.\n`
        )
        return res.status(404).json({ message: 'Not Found' })
      } else {
        console.log(
          `\n👍 members/exclude:\n projectId: ${projectId}의 confirmed 리스트에서 userId: ${userId}를 제외하였습니다.\n`
        )
        return res.status(204).json({ message: 'member moved to waiting list' })
      }
    },
  },
  post: async (req, res) => {
    //❗️❗️client 협의를 통해 api 수정 필요❗️❗️
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
    if (!result) {
      console.log(
        `\n❗️ members(getList):\n projectId: ${projectId}를 찾을 수 없습니다.\n`
      )
      return res.status(404).json({ message: 'Project not found' })
    }
    console.log(
      `\n👍 members(getList):\n projectId: ${projectId}의 확정/대기 명단을 전송하였습니다.\n`
    )
    return res.status(200).json(result)
  },
}

'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('project_users', [
      {
        userId: 1,
        projectId: 1,
        join: 1,
      },
      {
        userId: 2,
        projectId: 2,
        join: 1,
      },
      {
        userId: 3,
        projectId: 1,
        join: 1,
      },
      {
        userId: 4,
        projectId: 1,
        join: 0,
      },
      {
        userId: 5,
        projectId: 1,
        join: 0,
      },
      {
        userId: 6,
        projectId: 1,
        join: 0,
      },
      {
        userId: 6,
        projectId: 2,
        join: 0,
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('project_users', null, {})
  },
}

'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_stacks', [
      {
        userId: 1,
        stackId: 1,
      },
      {
        userId: 1,
        stackId: 2,
      },
      {
        userId: 1,
        stackId: 3,
      },
      {
        userId: 1,
        stackId: 4,
      },
      {
        userId: 2,
        stackId: 5,
      },
      {
        userId: 2,
        stackId: 6,
      },
      {
        userId: 3,
        stackId: 7,
      },
      {
        userId: 3,
        stackId: 8,
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_stacks', null, {})
  },
}

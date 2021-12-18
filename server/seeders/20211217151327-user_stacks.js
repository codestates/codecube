'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_stacks', [{
      id: 1,
      user_id: 5,
      stack_id: 5
    },
    {
      id: 2,
      user_id: 5,
      stack_id: 6
    },
    {
      id: 3,
      user_id: 1,
      stack_id: 2
    },
    {
      id: 4,
      user_id: 1,
      stack_id: 4
    },
    {
      id: 5,
      user_id: 2,
      stack_id: 10
    },
    {
      id: 6,
      user_id: 2,
      stack_id: 8
    },
    {
      id: 7,
      user_id: 3,
      stack_id: 3
    },
    {
      id: 8,
      user_id: 3,
      stack_id: 2
    }]
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_stacks',null,{})
  }
}

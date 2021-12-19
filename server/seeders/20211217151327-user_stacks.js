'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_stacks', [{
      id: 1,
      user_id: 5,
      stack_id: 5,
      createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
      id: 2,
      user_id: 5,
      stack_id: 6,
      createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
      id: 3,
      user_id: 1,
      stack_id: 2,
      createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
      id: 4,
      user_id: 1,
      stack_id: 4,
      createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
      id: 5,
      user_id: 2,
      stack_id: 10,
      createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
      id: 6,
      user_id: 2,
      stack_id: 8,
      createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
      id: 7,
      user_id: 3,
      stack_id: 3,
      createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
      id: 8,
      user_id: 3,
      stack_id: 2,
      createdAt: new Date(),
     updatedAt: new Date(),
    }]
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_stacks',null,{})
  }
}

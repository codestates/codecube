'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('project_users', [{
      id: 1,
      user_id: 1,
      project_id:5, 
      join:0,createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      user_id: 1,
      project_id:3, 
      join:1,
      createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
      id: 9,
      user_id: 6,
      project_id:3, 
      join:0,
      createdAt: new Date(),
     updatedAt: new Date(),
    },
    ])
  },

  down: async (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('project_users',null,{})
  }
}

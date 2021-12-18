'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('project_users', [{
      id: 1,
      user_id: 1,
      project_id:5, 
      join:0
    },
    {
      id: 2,
      user_id: 1,
      project_id:2, 
      join:1
    },
    {
      id: 3,
      user_id: 1,
      project_id:3, 
      join:1
    },
    {
      id: 4,
      user_id: 4,
      project_id:2, 
      join:0
    },
    {
      id: 5,
      user_id: 3,
      project_id:2, 
      join:0
    },
    {
      id: 6,
      user_id: 2,
      project_id:5, 
      join:0
    },
    {
      id: 7,
      user_id:4 ,
      project_id:1, 
      join:1
    },
    {
      id: 8,
      user_id:5 ,
      project_id:2, 
      join:1
    },
    {
      id: 9,
      user_id: 6,
      project_id:3, 
      join:0
    },
    {
      id: 10,
      user_id: 6,
      project_id:2, 
      join:1
    }]
    )
  },

  down: async (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('project_users',null,{})
  }
}

'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('stacks',[{
      id: 1,
      name: 'JavaScript',
      createdAt: new Date(),
     updatedAt: new Date(),
      },
      {
        id:2,
        name:'React',
        createdAt: new Date(),
     updatedAt: new Date(),
      },
      {
        id:3,
        name:'Node.js',
        createdAt: new Date(),
     updatedAt: new Date(),
      },
      {
        id:4,
        name:'express',
        createdAt: new Date(),
     updatedAt: new Date(),
      },
      {
        id:5,
        name:'Docker',
        createdAt: new Date(),
     updatedAt: new Date(),
      },
      {
        id:6,
        name:'css_styled',
        createdAt: new Date(),
     updatedAt: new Date(),
      },
      {
        id:7,
        name:'Mysql',
        createdAt: new Date(),
     updatedAt: new Date(),
      },
      {
        id:8,
        name:'MongoDB',
        createdAt: new Date(),
     updatedAt: new Date(),
      },
      {
        id:9,
        name:'redis',
        createdAt: new Date(),
     updatedAt: new Date(),
      },
      {
        id:10,
        name:'Python',
        createdAt: new Date(),
     updatedAt: new Date(),
      },
      {
        id:11,
        name:'C#',
        createdAt: new Date(),
     updatedAt: new Date(),
      }]
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('stacks',null,{})
  }
}

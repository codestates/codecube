'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('stacks',[{
      id: 1,
      name: 'JavaScript'
      },
      {
        id:2,
        name:'React'
      },
      {
        id:3,
        name:'Node.js'
      },
      {
        id:4,
        name:'express'
      },
      {
        id:5,
        name:'Docker'
      },
      {
        id:6,
        name:'css_styled'
      },
      {
        id:7,
        name:'Mysql'
      },
      {
        id:8,
        name:'MongoDB'
      },
      {
        id:9,
        name:'redis'
      },
      {
        id:10,
        name:'Python'
      },
      {
        id:11,
        name:'C#'
      }]
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('stacks',null,{})
  }
}

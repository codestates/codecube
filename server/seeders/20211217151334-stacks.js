'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('stacks', [
      {
        name: 'JavaScript',
      },
      {
        name: 'React',
      },
      {
        name: 'Node.js',
      },
      {
        name: 'express',
      },
      {
        name: 'Docker',
      },
      {
        name: 'css_styled',
      },
      {
        name: 'Mysql',
      },
      {
        name: 'MongoDB',
      },
      {
        name: 'redis',
      },
      {
        name: 'Python',
      },
      {
        name: 'C#',
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('stacks', null, {})
  },
}

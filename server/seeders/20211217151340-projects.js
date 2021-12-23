'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('projects', [
      {
        userId: 1,
        title: '채팅사이즈',
        content: '익스펙트 팩트로놈',
        image: 'potkyw',
      },
      {
        userId: 2,
        title: '카페',
        content: '눈누난나',
        image: 'lklpojkp;',
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('projects', null, {})
  },
}

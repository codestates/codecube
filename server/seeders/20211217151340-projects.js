'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('projects',[
       {
        id: 3,
        user_id:3,
        title: '채팅사이즈',
        content: '익스펙트 팩트로놈',
        image:'potkyw',
        start:1,
        done:1,
        createdAt: new Date(),
     updatedAt: new Date(),
       },
       {
        id: 5,
        user_id:5,
        title: '카페',
        content: '눈누난나',
        image:'lklpojkp;',
        start:1,
        done:0,
        createdAt: new Date(),
     updatedAt: new Date(),
       }, 
      ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('projects',null,{})
  }
}

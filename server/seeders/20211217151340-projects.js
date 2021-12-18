'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('projects',[{
       id: 1,
       user_id: 1,
       title: '날씨어플',
       content: '주저리주저리',
       image:'asd',
       start:1,
       done:0
       },
       {
        id: 2,
        user_id:1,
        title: '쇼핑몰',
        content: '수리수리마수리',
        image:'awsdas',
        start:0,
        done:0
       },
       {
        id: 3,
        user_id:2,
        title: '중고거래 사이트',
        content: '아브라카다브라',
        image:'asvasv',
        start:0,
        done:0
       },
       {
        id: 4,
        user_id:3,
        title: '채팅사이즈',
        content: '익스펙트 팩트로놈',
        image:'potkyw',
        start:1,
        done:1
       },
       {
        id: 5,
        user_id:5,
        title: '카페',
        content: '눈누난나',
        image:'lklpojkp;',
        start:1,
        done:0
       }, 
      ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('projects',null,{})
  }
}

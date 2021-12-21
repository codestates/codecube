'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        username: '김홍식',
        email: 'aa@code.com',
        image: 'asd',
        password: '1',
        description: '나는 코딩왕이 될거야',
      },
      {
        username: '권오연',
        email: 'bb@code.com',
        image: 'sss',
        password: '1',
        description: '안녕하세요~ 여러분',
      },
      {
        username: '강한결',
        email: 'cc@code.com',
        image: 'zxczv',
        password: '1',
        description: '반갑습니다. 미래의 개발자 여러분',
      },
      {
        username: '권혜림',
        email: 'dd@code.com',
        image: 'basvasv',
        password: '1',
        description: '안녕안녕~~',
      },
      {
        username: '김은혜',
        email: 'ee@code.com',
        image: 'asfvasvbasb',
        password: '1',
        description: '어머니는 짜장면이 싫다고 하셨어',
      },
      {
        username: '김여래',
        email: 'asdasg@code.com',
        image: 'asvasbasv',
        password: '1',
        description: '암온더 넥스트 레벨',
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  },
}

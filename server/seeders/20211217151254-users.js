'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        username: '김식',
        email: 'aa@code.com',
        oauth: 0,
        password: '1',
        description: '나는 코딩왕이 될거야',
      },
      {
        username: '권식',
        email: 'bb@code.com',
        oauth: 0,
        password: '1',
        description: '안녕하세요~ 여러분',
      },
      {
        username: '강홍결',
        email: 'cc@code.com',
        oauth: 0,
        password: '1',
        description: '반갑습니다. 미래의 개발자 여러분',
      },
      {
        username: '권예림',
        email: 'dd@code.com',
        oauth: 0,
        password: '1',
        description: '안녕안녕~~',
      },
      {
        username: '김민혜',
        email: 'ee@code.com',
        oauth: 0,
        password: '1',
        description: '어머니는 짜장면이 싫다고 하셨어',
      },
      {
        username: '김유래',
        email: 'ff@code.com',
        oauth: 0,
        password: '1',
        description: '암온더 넥스트 레벨',
      },
      {
        username: '이아윤',
        email: 'gg@code.com',
        oauth: 0,
        password: '1',
        description: '암온더 넥스트 레벨',
      },
      {
        username: '장미국',
        email: 'hh@code.com',
        oauth: 0,
        password: '1',
        description: '암온더 넥스트 레벨',
      },
      {
        username: '킴성태',
        email: 'ii@code.com',
        oauth: 0,
        password: '1',
        description: '암온더 넥스트 레벨',
      },
      {
        username: '박준식',
        email: 'jj@code.com',
        oauth: 0,
        password: '1',
        description: '암온더 넥스트 레벨',
      },
      {
        username: '임진우',
        email: 'kk@code.com',
        oauth: 0,
        password: '1',
        description: '암온더 넥스트 레벨',
      },
      {
        username: '김준석',
        email: 'll@code.com',
        oauth: 0,
        password: '1',
        description: '암온더 넥스트 레벨',
      },
      {
        username: '준혁',
        email: '13@code.com',
        oauth: 0,
        password: '1',
        description: '깡통유저',
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  },
}

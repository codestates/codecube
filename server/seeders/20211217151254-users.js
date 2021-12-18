'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users',[{
     id: 1,
     username:'김홍식',
     email: 'qwer@code.com',
     image: 'asd',
     password: 'qwer123',
     description:'나는 코딩왕이 될거야'
     },
     {
      id: 2,
      username:'권오연',
      email: 'asd@code.com' ,
      image: 'sss',
      password: 'codecode',
      description:'안녕하세요~ 여러분'
     },
     {
      id: 3,
      username:'강한결',
      email: 'xcv@code.com' ,
      image: 'zxczv',  
      password: 'kang123',
      description:'반갑습니다. 미래의 개발자 여러분'
     },
     {
      id: 4,
      username:'권혜림',
      email: 'asdfd@code.com',
      image: 'basvasv',
      password: 'ghl456',
      description:'안녕안녕~~'
     },
     {
      id: 5,
      username:'김은혜',
      email: 'rweweg@code.com',
      image: 'asfvasvbasb',
      password: 'cube5412',
      description:'어머니는 짜장면이 싫다고 하셨어'  
     }, 
     {
      id: 6,
      username:'김여래',
      email: 'asdasg@code.com',  
      image: 'asvasbasv',
      password: 'qncj0515',
      description:'암온더 넥스트 레벨'
     },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  },
}

const router = require('express').Router()
const controller = require('../controllers')

// 내정보 요청
router.get('/users', controller.users.users.get)
// 회원탈퇴
router.delete('/uesrs', controller.users.users.delete)
// 내정보 변경
router.put('/', controller.users.changeinfo.put)
// 로그아웃
router.get('/logout', controller.users.logout.get)
// 회원 가입
router.post('/signup', controller.users.signup.post)
// 로그인 
router.post('/login', controller.users.login.post)

module.exports = router

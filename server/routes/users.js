const router = require('express').Router()
const controller = require('../controllers')
const {upload,uploadImage} = require('../upload')


// 내정보 요청
router.get('/users', controller.users.users.get)
// 회원탈퇴
router.delete('/users', controller.users.users.delete)
// 내정보 변경
router.put('/users', controller.users.changeinfo.put)
// 로그아웃
router.get('/logout', controller.users.logout.get)
// 회원 가입s
router.post('/signup', controller.users.signup.post)
// 로그인
router.post('/login', controller.users.login.post)
//개인 게시판 요청
router.get('/myProjects', controller.projects.private_post.get)
// 이미지 업로드
router.post('/image', upload.single('image'),  uploadImage)

module.exports = router

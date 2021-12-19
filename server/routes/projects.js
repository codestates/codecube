const router = require('express').Router()
const controller = require('../controllers')

//게시글 삭제
router.delete('/:postId', controller.projects.project.delete)
//게시글 수정
router.put('/:postId', controller.projects.project.put)
//게시글 작성
router.post('/', controller.projects.post.post)
//특정 게시글 요청
router.get('/:postId', controller.projects.post.get)
//전체 개시글 요청
router.get('/', controller.projects.project.get)

module.exports = router
const router = require('express').Router()
const controller = require('../controllers')
const thumbnailUploader = require('../controllers/thumbnailUploader')

//게시글 삭제
router.delete('/:projectId', controller.projects.project.delete)
//게시글 수정
router.put('/:projectId', controller.projects.project.put.changeContent)
//프로젝트 스타트 요청
router.put('/:projectId/start', controller.projects.project.put.start)
//프로젝트 종료 요청
router.put('/:projectId/done', controller.projects.project.put.done)
//게시글 작성
router.post('/', thumbnailUploader, controller.projects.post.post)
//특정 게시글 요청
router.get('/:projectId', controller.projects.post.get)
//전체 개시글 요청
router.get('/', controller.projects.project.get)

module.exports = router

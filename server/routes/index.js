const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/questions', Controller.fetchData)
router.get('/questions/:id', Controller.getData)
router.post('/questions', Controller.getAnswer)

module.exports = router
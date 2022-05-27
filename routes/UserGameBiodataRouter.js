const express = require('express')
const router = express.Router()
const UserGameBiodataController = require('../controllers/UserGameBiodataController')
const Middleware = require('../middleware/Middleware')
const ctl = new UserGameBiodataController()

router.get('/user-game-biodata', Middleware.verifyJwtPage, ctl.index)
router.get('/user-game-biodata/show/:id', Middleware.verifyJwtPage, ctl.show)
router.get('/user-game-biodata/create', Middleware.verifyJwtPage, ctl.create)
router.get('/user-game-biodata/update/:id', Middleware.verifyJwtPage, ctl.update)

module.exports = router

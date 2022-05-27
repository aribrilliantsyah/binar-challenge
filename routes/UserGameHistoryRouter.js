const express = require('express')
const router = express.Router()
const UserGameHistoryController = require('../controllers/UserGameHistoryController')
const Middleware = require('../middleware/Middleware')
const ctl = new UserGameHistoryController()

router.get('/user-game-history', Middleware.verifyJwtPage, ctl.index)
router.get('/user-game-history/show/:id', Middleware.verifyJwtPage, ctl.show)
router.get('/user-game-history/create', Middleware.verifyJwtPage, ctl.create)
router.get('/user-game-history/update/:id', Middleware.verifyJwtPage, ctl.update)

module.exports = router

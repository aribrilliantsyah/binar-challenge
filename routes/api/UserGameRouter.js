const express = require('express')
const router = express.Router()
const UserGameController = require('../../controllers/api/UserGameController')
const Middleware = require('../../middleware/Middleware')
const ctl = new UserGameController()

router.get(`/user-game/`, Middleware.verifyJwt, ctl.getAll)
router.get(`/user-game/:id`, Middleware.verifyJwt, ctl.findByID)
router.post(`/user-game`, Middleware.verifyJwt, ctl.create)
router.put(`/user-game/:id`, Middleware.verifyJwt, ctl.update)
router.delete(`/user-game/:id`, Middleware.verifyJwt, ctl.delete)

module.exports = router

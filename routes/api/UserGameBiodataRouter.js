const express = require('express')
const router = express.Router()
const UserGameBiodataController = require('../../controllers/api/UserGameBiodataController')
const Middleware = require('../../middleware/Middleware')
const ctl = new UserGameBiodataController()

router.get(`/user-game-biodata/`, Middleware.verifyJwt, ctl.getAll)
router.get(`/user-game-biodata/:id`, Middleware.verifyJwt, ctl.findByID)
router.post(`/user-game-biodata`, Middleware.verifyJwt, ctl.create)
router.put(`/user-game-biodata/:id`, Middleware.verifyJwt, ctl.update)
router.delete(`/user-game-biodata/:id`, Middleware.verifyJwt, ctl.delete)

module.exports = router

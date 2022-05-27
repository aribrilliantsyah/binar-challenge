const express = require('express')
const router = express.Router()
const RoleController = require('../../controllers/api/RoleController')
const Middleware = require('../../middleware/Middleware')
const ctl = new RoleController()

router.get(`/role/`, Middleware.verifyJwt, ctl.getAll)
router.get(`/role/:id`, Middleware.verifyJwt, ctl.findByID)

module.exports = router

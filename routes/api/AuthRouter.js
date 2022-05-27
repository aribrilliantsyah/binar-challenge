const express = require('express')
const router = express.Router()
const AuthController = require('../../controllers/api/AuthController')
const ctl = new AuthController()

router.post('/login', ctl.login)
router.post('/register', ctl.register)

module.exports = router

const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')
const Mailer = require('../utils/mailer')
const ctl = new AuthController()

router.get('/', (req, res) => {
  res.redirect('/login')
})
router.get('/login', ctl.login)
router.get('/logout', ctl.logout)
router.get('/register', ctl.register)
router.get('/forgot_password', ctl.forgot_password)

module.exports = router

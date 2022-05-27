const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')
const ctl = new AuthController()

router.get('/', (req, res) => {
    res.redirect('/login')
})
router.get('/login', ctl.login)
router.get('/logout', ctl.logout)
router.get('/register', ctl.register)

module.exports = router

const express = require('express')
const router = express.Router()
const UserGameController = require('../controllers/UserGameController')
const Middleware = require('../middleware/Middleware')
const ctl = new UserGameController()

router.get('/dashboard', Middleware.verifyJwtPage, (req, res) => {
    let username = req.user?.username
    res.render('pages/index', {username: username})
})
router.get('/user-game', Middleware.verifyJwtPage, ctl.index)
router.get('/user-game/show/:id', Middleware.verifyJwtPage, ctl.show)
router.get('/user-game/create', Middleware.verifyJwtPage, ctl.create)
router.get('/user-game/update/:id', Middleware.verifyJwtPage, ctl.update)

module.exports = router

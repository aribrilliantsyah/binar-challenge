const express = require('express');
const path = require('path')
const router = express.Router()
const UserGameHistoryController = require('../../controllers/api/UserGameHistoryController');
const Middleware = require('../../middleware/Middleware');
const ctl = new UserGameHistoryController();
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./uploads/`)
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})

const upload = multer({ storage: storage })
  
router.get(`/user-game-history/`, Middleware.verifyJwt, ctl.getAll)
router.get(`/user-game-history/:id`, Middleware.verifyJwt, ctl.findByID)
router.post(`/user-game-history`, Middleware.verifyJwt, ctl.create)
router.put(`/user-game-history/:id`, Middleware.verifyJwt, ctl.update)
router.delete(`/user-game-history/:id`, Middleware.verifyJwt, ctl.delete)
router.post(`/user-game-history/upload-video/:id`, upload.single('media'), Middleware.verifyJwt, ctl.uploadVideo)

module.exports = router

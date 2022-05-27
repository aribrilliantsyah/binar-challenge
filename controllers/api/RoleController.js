const { UserGame, UserGameBiodata, UserGameHistory, Role } = require("../../models")
const { v4: uuidv4 } = require('uuid')

class RoleController {
  
  getAll(req, res) {
    Role.findAll().then((role) => {
      return res.status(200).json({
        'message': 'Success',
        'data': role
      })
    }).catch((err) => {
      // console.log('woy ',err)
      return res.status(400).json({
        'message': 'Failed'
      })
    })
  }

  findByID(req, res) {
    Role.findOne({
      where: {id: req.params.id }
    }).then((role) => {
      return res.status(200).json({
        'message': 'Success',
        'data': role
      })
    }).catch((err) => {
      //console.log(err)
      return res.status(400).json({
        'message': 'Failed'
      })
    })
  }
}

module.exports = RoleController
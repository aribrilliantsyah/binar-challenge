const { UserGame, UserGameBiodata, UserGameHistory } = require("../../models")
const jwt = require('jsonwebtoken')
const moment = require('moment')
const privateKey = 'Ari-Ganteng-Banget'
const { v4: uuidv4 } = require('uuid')

class AuthController {
  
  async login(req, res) {
    let {username, password} = req.body

    if(!username || !password){
      return res.status(400).json({
        'message': 'Failed'
      })
    }
    
    let user_game = await UserGame.findOne({where: {username: username }})
    if(!user_game?.username){
      return res.status(200).json({
        'message': 'Username not found'
      })
    }

    if(password != user_game?.password){
      return res.status(200).json({
        'message': 'Invalid password'
      })
    }

    let token = jwt.sign({
      id: user_game?.id,
      username: username,
      password: password,
      role_id: user_game?.role_id
    }, privateKey, {
      expiresIn: '1d'
    })

    await UserGame.update({
      token: token
    }, {
      where: {
        id: user_game.id
      }
    })

    if(req?.session){
      req.session.token = token
      req.session.role_id = user_game?.role_id
    }

    return res.status(200).json({
      'message': 'Username & Password Match',
      'data': {
        'token': token,
        'expired_at': moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss')
      }
    })
  }

  async register(req, res) {
    let { username, password } = req.body

    let uid = uuidv4()

    if(!username || !password){
      return res.status(400).json({
        'message': 'Failed'
      })
    }

    await UserGame.create({
      uid: uid,
      username: username,
      password: password,
      role_id: 2
    }).then((usergame) => {
      return res.status(201).json({
        'message': 'Register success, please sign in',
        'data': usergame
      })
    }).catch((err) => {
      return res.status(400).json({
        'message': 'Failed'
      })
    })
  }
}

module.exports = AuthController
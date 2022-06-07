const { UserGame, UserGameBiodata, UserGameHistory } = require("../../models")
const jwt = require('jsonwebtoken')
const moment = require('moment')
const privateKey = process.env.JWT_PRIVATE_KEY
const { v4: uuidv4 } = require('uuid')
const Mailer = require("../../utils/mailer")
const { genOTP } = require("../../utils/otp")

class AuthController {
  
  async login(req, res) {
    let {username, password} = req.body

    if(!username || !password){
      return res.status(400).json({
        'message': 'Failed'
      })
    }
    
    let user_game = await UserGame.findOne({where: {username: username }})

    //console.log(user_game)
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
    let { email, username, password } = req.body

    let uid = uuidv4()

    if(!email || !username || !password){
      return res.status(400).json({
        'message': 'Failed'
      })
    }

    await UserGame.create({
      uid: uid,
      email: email,
      username: username,
      password: password,
      role_id: 2
    }).then(async (usergame) => {
      let mailer = new Mailer({
        from: process.env.MAIL_SENDER
      });
      mailer.prepare({
        to: email,
        subject: 'Thank You',
        text: `Thank you for joining us ${username}`,
        html: `<h1>Thank you for joining us ${username}</h1>`
      })
      await mailer.send()

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

  
  async forgot_password(req, res) {
    let {email} = req.body

    if(!email){
      return res.status(400).json({
        'message': 'Failed'
      })
    }
    let user_game = await UserGame.findOne({where: {email: email }})

    if(!user_game?.email){
      return res.status(200).json({
        'message': 'Email not found'
      })
    }
  
    let otp = genOTP(6)

    await UserGame.update({
      otp: otp
    }, {
      where: {
        id: user_game.id
      }
    })

    let mailer = new Mailer({
      from: process.env.MAIL_SENDER
    });
    mailer.prepare({
      to: email,
      subject: 'Forgot Password',
      text: `OTP for reset password: ${otp}`,
      html: `<h1>OTP for reset password: ${otp}</h1>`
    })
    await mailer.send()

    return res.status(200).json({
      'message': 'Success OTP Send to Email',
      'otp': otp
    })
  }

  async verify_otp(req, res){
    let {email, otp} = req.body

    if(!email && !otp){
      return res.status(400).json({
        'message': 'Failed'
      })
    }

    let user_game = await UserGame.findOne({where: {email: email }})

    if(!user_game?.username){
      return res.status(200).json({
        'message': 'Email not found'
      })
    }
    
    //console.log(user_game.otp)

    if(user_game.otp != otp){
      return res.status(200).json({
        'match': false,
        'message': 'Invalid OTP',
      })
    }

    await UserGame.update({
      otp: null
    }, {
      where: {
        id: user_game.id
      }
    })

    return res.status(200).json({
      'match': true,
      'message': 'OTP Match',
      'uid': user_game.uid,
    })
  }

  async change_password(req, res){
    let {uid, password} = req.body

    if(!uid && !password){
      return res.status(400).json({
        'message': 'Failed'
      })
    }

    let user_game = await UserGame.findOne({where: {uid: uid }})

    if(!user_game?.username){
      return res.status(200).json({
        'message': 'User not found'
      })
    }
    
    await UserGame.update({
      password: password
    }, {
      where: {
        id: user_game.id
      }
    })

    return res.status(200).json({
      'success': true,
      'message': 'Password Changed',
    })
  }
}

module.exports = AuthController
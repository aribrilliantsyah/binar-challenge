const { UserGame, UserGameBiodata, UserGameHistory, Role } = require("../../models")
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

class UserGameController {
  
  getAll(req, res) {
    let Obj;

    if(req.user?.role_id == 1){
      Obj = UserGame.findAll({
        include: [
          {
            model: UserGameBiodata,
            as: 'biodata'
          },
          {
            model: UserGameHistory,
            as: 'histories'
          },
          {
            model: Role,
            as: 'role'
          }
        ]
      })
    }else{
      Obj = UserGame.findAll({
        include: [
          {
            model: UserGameBiodata,
            as: 'biodata'
          },
          {
            model: UserGameHistory,
            as: 'histories'
          },
          {
            model: Role,
            as: 'role'
          }
        ],
        where: {id: req.user?.id }
      })
    }

    Obj.then((usergame) => {
      return res.status(200).json({
        'message': 'Success',
        'data': usergame
      })
    }).catch((err) => {
      // console.log('woy ',err)
      return res.status(400).json({
        'message': 'Failed'
      })
    })
  }

  findByID(req, res) {
    UserGame.findOne({
      include: [
        {
          model: UserGameBiodata,
          as: 'biodata'
        },
        {
          model: UserGameHistory,
          as: 'histories'
        },
        {
          model: Role,
          as: 'role'
        }
      ],
      where: {id: req.params.id }
    }).then((usergame) => {
      return res.status(200).json({
        'message': 'Success',
        'data': usergame
      })
    }).catch((err) => {
      //console.log(err)
      return res.status(400).json({
        'message': 'Failed'
      })
    })
  }

  create(req, res) {
    let { email, username, password, role_id } = req.body
    let uid = uuidv4()
    
    if(!email || !username || !password || !role_id){
      return res.status(400).json({
        'message': 'Failed'
      })
    }
    
    UserGame.create({
      uid: uid,
      email: email,
      username: username,
      password: bcrypt.hashSync(password, salt),
      role_id: role_id,
    }).then((usergame) => {
      return res.status(201).json({
        'message': 'Success',
        'data': usergame
      })
    }).catch((err) => {
      return res.status(400).json({
        'message': 'Failed'
      })
    })
  }

  update(req, res) {
    let id = req.params.id   
    let usergame_data = {
      email: req.body?.email,
      username: req.body?.username,
      role_id: req.body?.role_id,
    }
    let query = {
      where: {
        id: id
      }
    }
    //console.log(usergame_data)

    if(!usergame_data.email || !usergame_data.username || !usergame_data.role_id){
      return res.status(400).json({
        'message': 'Failed'
      })
    }

    if(req.body?.password != undefined && req.body?.password != ''){
      usergame_data.password = bcrypt.hashSync(req.body?.password, salt)
    }

    //console.log(usergame_data)
    const checkBefore = (id, success, failed) => {
      UserGame.findOne({
        include: [
          {
            model: UserGameBiodata,
            as: 'biodata'
          },
          {
            model: UserGameHistory,
            as: 'histories'
          }
        ],
        where: {id: id }
      }).then((usergame) => {
        if(!usergame){
          return res.status(200).json({
            'message': 'Data not found',
          })
        }
        return success(usergame)
      }).catch((err) => {
        return failed(err)
      })
    } 
    
    checkBefore(id, (data) => {
      UserGame.update(usergame_data, query).then((usergame) => {
        return res.status(200).json({
          'message': 'Success',
          'data': usergame_data
        })
      }).catch((err) => {
        //console.log(err)
        return res.status(400).json({
          'message': 'Failed'
        })
      })
    }, (err) => {
      //console.log(err)
      return res.status(400).json({
        'message': 'Failed'
      })
    })
  }

  delete(req, res) {
    let id = req.params.id
    const checkBefore = (id, success, failed) => {
      UserGame.findOne({where: {id: id }}).then((usergame) => {
        return success(usergame)
      }).catch((err) => {
        return failed(err)
      })
    } 
    
    checkBefore(id, async (data) => {
      if(!data){
        return res.status(200).json({
          'message': 'Data not found',
        })
      }

      await UserGameBiodata.destroy({
        where: {user_game_id: id}
      })
      await UserGameHistory.destroy({
        where: {user_game_id: id}
      })

      UserGame.destroy({
        where: {id: id }
      }).then((usergame) => {
        return res.status(200).json({
          'message': `Success delete data with id ${id}`,
        })
      }).catch((err) => {
        return res.status(400).json({
          'message': 'Failed'
        })
      })
    }, (err) => {
      //console.log(err)
      return res.status(400).json({
        'message': 'Failed'
      })
    })
  }

}

module.exports = UserGameController
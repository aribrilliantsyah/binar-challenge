class UserGameController {
    index(req, res){
        let user_current = req.user
        let token = req?.session?.token
        let role_id = req?.session?.role_id
        //console.log(user_current)
        res.render('pages/user_game/list', {token: token, user_current: user_current, role_id: role_id})
    }
    
    show(req, res){
        let token = req?.session?.token
        let id = req.params?.id
        res.render('pages/user_game/show', {id: id, token: token})
    }

    create(req, res){
        let token = req?.session?.token
        res.render('pages/user_game/create', {token: token})
    }

    update(req, res){
        let token = req?.session?.token
        let id = req.params?.id
        res.render('pages/user_game/update', {id: id, token: token})
    }
}

module.exports = UserGameController
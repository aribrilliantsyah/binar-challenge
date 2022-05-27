class UserGameHistoryController {
    index(req, res){
        let token = req?.session?.token
        let user_game_id = req.query?.user_game_id
        res.render('pages/user_game_history/list', {user_game_id: user_game_id, token: token})
    }
    
    show(req, res){
        let token = req?.session?.token
        let id = req.params?.id
        let user_game_id = req.query?.user_game_id
        res.render('pages/user_game_history/show', {id: id, user_game_id: user_game_id, token: token})
    }
    
    create(req, res){
        let token = req?.session?.token
        let user_game_id = req.query?.user_game_id
        res.render('pages/user_game_history/create', {user_game_id: user_game_id, token: token})
    }
    
    update(req, res){
        let token = req?.session?.token
        let id = req.params?.id
        let user_game_id = req.query?.user_game_id
        res.render('pages/user_game_history/update', {id: id, user_game_id: user_game_id, token: token})
    }
}

module.exports = UserGameHistoryController
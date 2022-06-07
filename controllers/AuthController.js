class AuthController {
    login(req, res){
        res.render('auth/login')
    }
    
    register(req, res){
        res.render('auth/register')
    }

    logout(req, res){
        req.session.token = null
        res.redirect('/login')    
    }

    forgot_password(req, res){
        res.render('auth/forgot_password')
    }
}

module.exports = AuthController
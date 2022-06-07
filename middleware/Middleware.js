const jwt = require('jsonwebtoken')
const privateKey = process.env.JWT_PRIVATE_KEY

class Middleware {

    static verifyJwt(req, res, next){
        const authHeader = req?.headers['authorization']
        if(!authHeader){
            return res.status(401).json({
                'message': 'Unauthorized'
            })
        }

        const token = authHeader && authHeader.split(' ')[1]

        if(authHeader.split(' ')[0] != 'Bearer') return res.status(422).json({
            'message': 'Invalid Bearer Token'
        })

        if (token == null) return res.status(401).json({
            'message': 'Unauthorized'
        })

        jwt.verify(token, privateKey, (err, user) => {
            // console.log(user)
            if (err) return res.status(403).json({
                'message': 'Forbidden'
            })

            req.user = user
            next()
        })
    }

    static verifyJwtPage(req, res, next){
        let token = req?.session?.token

        jwt.verify(token, privateKey, (err, user) => {
            if (err) res.redirect('/login');
            req.user = user
            next()
        })
    }
}

module.exports = Middleware
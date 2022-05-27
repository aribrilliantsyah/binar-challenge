const express = require("express")
const session = require('express-session')
const moment = require("moment")
const morgan = require("morgan")
const swaggerUi = require('swagger-ui-express')
const path = require('path')
const YAML = require('yamljs')
const fs = require('fs')

const UserGameRouterApi = require("./routes/api/UserGameRouter")
const UserGameBiodataRouterApi = require("./routes/api/UserGameBiodataRouter")
const UserGameHistoryRouterApi = require("./routes/api/UserGameHistoryRouter")
const RoleRouterApi = require("./routes/api/RoleRouter")
const AuthRouterApi = require("./routes/api/AuthRouter")
const UserGameRouter = require("./routes/UserGameRouter")
const UserGameBiodataRouter = require("./routes/UserGameBiodataRouter")
const UserGameHistoryRouter = require("./routes/UserGameHistoryRouter")
const AuthRouter = require("./routes/AuthRouter")

const app = express()
const apiVersion = '/api/v1'
const swaggerDocument = YAML.load('collection.yaml')

//Setup Log
const originalSend = app.response.send

let log_name = './logs/access_log_'+moment().format('YYYY_MM_DD')+'.log';
let accessLogStream = fs.createWriteStream(log_name, { flags: 'a' })

app.response.send = function sendOverWrite(body) {
    originalSend.call(this, body)
    this.resBody = body
}

morgan.token('res-body', (req, res) => {
    if(res.getHeader('Content-Type') == 'application/json; charset=utf-8'){
        if(typeof res.resBody == 'string'){
            return res.resBody        
        }else{
            return JSON.stringify(res.resBody)      
        }
    }
    return JSON.stringify({
        'message': 'Accessing View'
    })
})

morgan.token('req-body', (req, res) => {
    if(res.getHeader('Content-Type') == 'application/json; charset=utf-8'){
        return JSON.stringify(req.body)        
    }
    return null
})

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] | @req :req-body => @res :res-body', {
    stream: accessLogStream
}))

app.set('view engine', 'ejs')

app.use(session({
    secret: 'wow-ini-rahasia',
    resave: false,
    saveUninitialized: true
}))
app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(apiVersion, UserGameRouterApi)
app.use(apiVersion, UserGameBiodataRouterApi)
app.use(apiVersion, UserGameHistoryRouterApi)
app.use(apiVersion, RoleRouterApi)
app.use(apiVersion, AuthRouterApi)

app.use(UserGameRouter)
app.use(UserGameBiodataRouter)
app.use(UserGameHistoryRouter)
app.use(AuthRouter)

module.exports = app
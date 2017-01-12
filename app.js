import express from 'express'

//Middlewares
import SetWeChatAccessToken from './middlewares/wechat-access-token'
import VerifyClient from './middlewares/server-list-verify'

//Controllers
import getServerList from './controllers/wechat-server-list'
import verify from './controllers/wechat-verify'
import index from './controllers/index'

//Set up config
let config = null
try {
    config = require('./config/config')

} catch (ex) {
    config = {
        secret: {
            appId: process.env.appId,
            appsecret: process.env.appsecret,
            token: process.env.token
        }
    }
}

const app = express()

const exclude = (path, middleware) => {
    return (req, res, next) => {
        if(req.path == path) {
            return next()
        }else{
            middleware(req, res, next)
        }
    }
}

app.use(exclude('/verify', new SetWeChatAccessToken(config)))
app.use(exclude('/verify', new VerifyClient()))

//Configuration
const port = process.env.PORT || 3000

//Routes
app.get('/verify', verify(config))
app.get('/serverlist', getServerList)
app.get('/', index)

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
})

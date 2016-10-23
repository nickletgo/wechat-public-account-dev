import express from 'express'

//Middlewares
import SetWeChatAccessToken from './middlewares/wechat-access-token'

//Controllers
import getServerList from './controllers/wechat-server-list'
import verify from './controllers/wechat-verify'

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
console.log(config)

const app = express()

app.use(SetWeChatAccessToken(config))

//Configuration
const port = process.env.PORT || 3000

//Routes
app.get('/', verify(config))
app.get('/serverlist', getServerList)

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
})

import express from 'express'


//Middlewares
import SetWeChatAccessToken from './middlewares/wechat-access-token'

//Controllers
import getServerList from './controllers/wechat-server-list'
import verify from './controllers/wechat-verify'

const app = express()

app.use(SetWeChatAccessToken)

//Configuration
const port = process.env.PORT || 3000

//Routes
app.get('/',verify)
app.get('/serverlist', getServerList)

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})

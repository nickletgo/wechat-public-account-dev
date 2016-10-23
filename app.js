import express from 'express'
import verify from './controllers/wechat-verify'

//Middlewares
import SetWeChatAccessToken from './middlewares/wechat-verify'

const app = express()

app.use(SetWeChatAccessToken)

//Configuration
const port = process.env.PORT || 3000

//Routes
app.get('/',verify)

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})

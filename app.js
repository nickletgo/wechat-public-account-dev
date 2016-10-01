import express from 'express'
import verify from './controllers/wechat-verify'

const app = express()

const port = process.env.PORT || 3000

app.get('/',verify)

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})

import express from 'express'

const app = express()

const port = process.env.PORT || 3000

app.get('/', function (req, res) {
    console.log('get method:')
    res.send(JSON.stringify(req.params))
})

app.post('/', (req, res) => {
    console.log('post method')
    res.send(JSON.stringify(req.params))
})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})

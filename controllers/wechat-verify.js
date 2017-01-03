import sha1 from 'sha1'

const verify = (config) => {
    return (req, res) => {
        const { signature, nonce, timestamp, echostr } = req.query
        const queryArr = [config.secret.token, timestamp, nonce]
        queryArr.sort()
        const calculatedSig = sha1(queryArr.join(''))
        if (calculatedSig == signature) {
            res.send(echostr)
        } else {
            res.send(null)
        }
    }
}

export default verify

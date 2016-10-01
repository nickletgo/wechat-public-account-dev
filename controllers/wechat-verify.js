import sha1 from 'sha1'

const token = 'milandoodle'

const verify = (req, res) => {
    const {signature, nonce, timestamp, echostr } = req.query
    const queryArr = [token, timestamp, nonce]
    queryArr.sort()
    const calculatedSig = sha1(queryArr.join(''))
    if(calculatedSig == signature){
        res.send(echostr)
    }else{
        res.send(null)
    }
}

export default verify
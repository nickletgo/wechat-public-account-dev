import sha1 from 'sha1'
import config from '../config/config'

const verify = (req, res) => {
    console.log(req.accessToken)
    const {signature, nonce, timestamp, echostr } = req.query
    const queryArr = [config.token, timestamp, nonce]
    queryArr.sort()
    const calculatedSig = sha1(queryArr.join(''))
    if(calculatedSig == signature){
        res.send(echostr)
    }else{
        res.send(null)
    }
}

export default verify
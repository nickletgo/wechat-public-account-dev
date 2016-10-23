import deepFreeze from 'deep-freeze'

let config = {
    secret : {
        appId : 'yourId',
        appsecret: 'yourSecret',
        token: 'yourToken'
    }
}

export default deepFreeze(config)
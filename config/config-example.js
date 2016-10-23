import deepFreeze from 'deep-freeze'

let config = {
    secret : {
        appId : 'yourId',
        appsecret: 'yourSecret'
    }
}

export default deepFreeze(config)
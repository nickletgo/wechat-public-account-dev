import deepFreeze from 'deep-freeze'

exports.secret = deepFreeze({
    appId: 'yourAppId',
    appsecret: 'yourAppSecret',
    token: 'yourToken'
})
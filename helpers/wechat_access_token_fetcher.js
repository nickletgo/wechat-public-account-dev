import https from 'https'

const url = 'https://api.weixin.qq.com/cgi-bin/'
const grantTypeVal = 'client_credential'

let instance = null
let expireDate = null
let accessToken = null

class WeChatAccessTokenSingleton {
    constructor() {
        if (!instance) {
            instance = this
        }
        return instance
    }

    getAccessToken(appId, appsecret, callback) {
        if (expireDate == null || new Date().getTime()) {
            const tokenUrl = `${url}token?grant_type=${grantTypeVal}&appid=${appId}&secret=${appsecret}`
            https.get(tokenUrl, this.setToken(callback)).on('error', (e) => {
                console.log(`Got error: ${e.message}`)
            })
        } else{
            callback(accessToken)
        }
    }

    setToken(callback) {
        return (res) => {
            let body = ''

            res.on('data', function(chunk) {
                body += chunk
            })

            res.on('end', function() {
                let { access_token: newAccessToken, expires_in: expiresIn } = JSON.parse(body)
                accessToken = newAccessToken
                let now = new Date()
                now.setSeconds(expiresIn)
                expireDate = now
                callback(accessToken)
            })
        }
    }
}

export default WeChatAccessTokenSingleton

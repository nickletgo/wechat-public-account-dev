import https from 'https'
import config from '../config/config'

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
    }

    getAccessToken() {
        if (expireDate == null || new Date().getTime() ) {
            const tokenUrl = `${url}token?grant_type=${grantTypeVal}&appid=${config.secret.appId}&secret=${config.secret.appsecret}`
                //console.log(tokenUrl)
            https.get(tokenUrl, this.setToken).on('error', (e) => {
                console.log(`Got error: ${e.message}`)
            })
        }

        return accessToken
    }

    setToken(res) {
        let body = ''

        res.on('data', function(chunk) {
            body += chunk
        })

        res.on('end', function() {
            let {access_token: newAccessToken, expires_in: expiresIn} = JSON.parse(body)
            accessToken = newAccessToken
            let now = new Date()
            now.setSeconds(expiresIn)
            expireDate  = now
        })
    }
}

export default WeChatAccessTokenSingleton

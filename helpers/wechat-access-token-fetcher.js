import https from 'https'
import redisClient from './redis-client'
const url = 'https://api.weixin.qq.com/cgi-bin/'
const grantTypeVal = 'client_credential'

let instance = null

class WeChatAccessTokenSingleton {
    constructor() {
        if (!instance) {
            instance = this
        }
        return instance
    }

    getAccessToken(appId, appsecret, callback) {
        var cachedAccessToken, cachedExpireDate

        redisClient.hgetall('accessTokenWithExpirationDate', (err, { accessToken, expireDate }) => {
            cachedExpireDate = expireDate
            cachedAccessToken = accessToken
            if (!cachedExpireDate || !cachedAccessToken || new Date() >= cachedExpireDate) {
                console.log('Fetching a new access token')
                const tokenUrl = `${url}token?grant_type=${grantTypeVal}&appid=${appId}&secret=${appsecret}`
                https.get(tokenUrl, this.setToken(callback)).on('error', (e) => {
                    console.log('error fetching token')
                    callback(e)
                })
            } else {
                console.log('Use the existing access token')
                callback(null, cachedAccessToken)
            }
        })
    }

    setToken(callback) {
        return (res) => {
            let body = ''

            res.on('data', function(chunk) {
                body += chunk
            })

            res.on('end', function() {
                let { errcode: errcode, errmsg: errmsg, access_token: newAccessToken, expires_in: expiresIn } = JSON.parse(body)
                if (errcode) {
                    callback(new Error(`Failed fetching access token from Wechat server. Error(code:${errcode}): ${errmsg}`))
                } else {
                    var newAccessTokenWithExpirationDate = {}
                    newAccessTokenWithExpirationDate.accessToken = newAccessToken
                    let now = new Date()
                    now.setSeconds(expiresIn)
                    newAccessTokenWithExpirationDate.expireDate = now
                    redisClient.hmset('accessTokenWithExpirationDate', newAccessTokenWithExpirationDate)
                    callback(null, newAccessToken)
                }
            })
        }
    }
}

export default WeChatAccessTokenSingleton

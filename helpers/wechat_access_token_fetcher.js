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
        if (expireDate == null || new Date() >= expireDate) {
            console.log('Fetching a new access token')
            const tokenUrl = `${url}token?grant_type=${grantTypeVal}&appid=${appId}&secret=${appsecret}`
            https.get(tokenUrl, this.setToken(callback)).on('error', (e) => {
                console.log('error fetching token')
                callback(e)
            })
        } else{
            console.log('Use the existing access token')
            callback(null, accessToken)
        }
    }

    setToken(callback) {
        return (res) => {
            let body = ''

            res.on('data', function(chunk) {
                body += chunk
            })

            res.on('end', function() {
                let { errcode: errcode, errmsg: errmsg, access_token: newAccessToken, expires_in: expiresIn } = JSON.parse(body)
                if(errcode){
                    callback(new Error(`Failed fetching access token from Wechat server. Error(code:${errcode}): ${errmsg}`))
                }else{
                    accessToken = newAccessToken
                    let now = new Date()
                    now.setSeconds(expiresIn)
                    expireDate = now
                    callback(null, accessToken)
                }
            })
        }
    }
}

export default WeChatAccessTokenSingleton

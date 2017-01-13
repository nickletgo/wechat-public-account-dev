import WeChatAccessTokenSingleton from '../helpers/wechat-access-token-fetcher'

let accessTokenSingleton = new WeChatAccessTokenSingleton()

const SetWeChatAccessToken = (config) => {

    return (req, res, next) => {
        accessTokenSingleton.getAccessToken(config.secret.appId, config.secret.appsecret, (error, accessToken) => {
            req.accessToken = accessToken
            if(accessToken != null) {
                next()
            } else{
                next(new Error(`Not able to get access token: ${error}`))
            }
        })
    }
}

export default SetWeChatAccessToken

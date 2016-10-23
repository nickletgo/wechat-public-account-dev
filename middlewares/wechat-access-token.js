import WeChatAccessTokenSingleton from '../helpers/wechat_access_token_fetcher'

let accessTokenSingleton = new WeChatAccessTokenSingleton()

const SetWeChatAccessToken = (config) => {
    return (req, res, next) => {
        accessTokenSingleton.getAccessToken(config.secret.appId, config.secret.appsecret, (accessToken) => {
            req.accessToken = accessToken
            next()
        })
    }
}

export default SetWeChatAccessToken

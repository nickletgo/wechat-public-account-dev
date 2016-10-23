import WeChatAccessTokenSingleton from '../helpers/wechat_access_token_fetcher'

let accessTokenSingleton = new WeChatAccessTokenSingleton()

const SetWeChatAccessToken = function(req, res, next) {
    accessTokenSingleton.getAccessToken((accessToken) => {
        req.accessToken = accessToken
        next()
    })
} 

export default SetWeChatAccessToken
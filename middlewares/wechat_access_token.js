import WeChatAccessTokenSingleton from '../helpers/wechat_access_token_fetcher'

const SetWeChatAccessToken = function(req, res, next) {
    req.wechatAccessToken = WeChatAccessTokenSingleton.getAccessToken()
    next()
} 

export default SetWeChatAccessToken
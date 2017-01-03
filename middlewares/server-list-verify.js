import WechatServerListSingleton from '../helpers/wechat-server-list-fetcher'
import requestIp from 'request-ip'

const verifyClient = () => {
    return (req, res, next) => {
        const isLocal = (ip) => {
            return ip == '127.0.0.1' || '::1' || '::ffff:127.0.0.1'
        }
        const serverListSingleton = new WechatServerListSingleton(req.accessToken)
        const clientIp = requestIp.getClientIp(req)
        if (!isLocal(clientIp)) {
            serverListSingleton.verifyClientIp((serverList) => {
                var err = null
                if (!serverList && serverList.count) {
                    err = new Error('WeChat server list is empty.')
                } else {
                    if (!clientIp) {
                        err = new Error('Can\'t find client ip for this request')
                    } else {
                        if (!serverList.includes(clientIp)) {
                            err = new Error('client ip of this request is not in the wechat server list')
                        }
                    }
                }

                if (err) {
                    next(err)
                }
            })
        }
        next()
    }
}

export default verifyClient

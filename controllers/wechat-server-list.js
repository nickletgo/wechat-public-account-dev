import WechatServerListSingleton from '../helpers/wechat-server-list-fetcher'

const getServerList = (req, res) => {
    new WechatServerListSingleton(req.accessToken).getServerList((serverList) => {
        res.send(serverList)
    })
}

export default getServerList
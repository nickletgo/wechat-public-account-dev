import https from 'https';

const urlBase = 'https://api.weixin.qq.com/cgi-bin/getcallbackip';

let instance = null;
let serverList = null;
let accessToken = null;
let updateList = true;

class WechatServerListSingleton {

  constructor(newAccessToken) {
    updateList = false;
    if (!instance) {
      instance = this;
      updateList = true;
    }

    if (!accessToken || newAccessToken !== accessToken) {
      accessToken = newAccessToken;
      updateList = true;
    }

    return instance;
  }

  verifyClientIp(callback) {
    if (updateList) {
      this.fetchServerList(callback);
    } else {
      callback(serverList);
    }
  }

  fetchServerList(callback) {
    const url = `${urlBase}?access_token=${accessToken}`;
    https.get(url, this.setServerList(callback))
      .on('error', e => console.log(`Got error: ${e.message}`));
  }

  static setServerList(callback) {
    return (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        const { ip_list: newServerList, errcode, errmsg } = JSON.parse(body);
        serverList = newServerList;
        if (errcode != null) {
          console.log(`Failed fetching wechat server list. Error code: ${errcode}. Error message: ${errmsg}`);
        } else {
          updateList = false;
          callback(serverList);
        }
      });
    };
  }
}

export default WechatServerListSingleton;

import https from 'https';
import redisClient from './redis-client';

const url = 'https://api.weixin.qq.com/cgi-bin/';
const grantTypeVal = 'client_credential';

let instance = null;

class WeChatAccessTokenSingleton {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  getAccessToken({ appId, appSecret }, callback) {
    let cachedAccessToken;
    let cachedExpireDate;
    let now;

    redisClient.hgetall('accessTokenWithExpirationDate', (err, { accessToken, expireDate }) => {
      cachedExpireDate = new Date(expireDate);
      cachedAccessToken = accessToken;
      now = new Date();

      if (!cachedExpireDate || !cachedAccessToken || now >= cachedExpireDate) {
        console.log('Fetching a new access token');
        const tokenUrl = `${url}token?grant_type=${grantTypeVal}&appid=${appId}&secret=${appSecret}`;
        https.get(tokenUrl, this.setToken(callback)).on('error', (e) => {
          console.log('error fetching token');
          callback(e);
        });
      } else {
        console.log('Use the existing access token');
        callback(null, cachedAccessToken);
      }
    });
  }

  setToken(callback) {
    return (res) => {
      this.body = '';

      res.on('data', (chunk) => {
        this.body += chunk;
      });

      res.on('end', () => {
        const {
            errcode,
            errmsg,
            access_token: newAccessToken,
            expires_in: expiresIn,
        } = JSON.parse(this.body);
        if (errcode) {
          callback(new Error(`Failed fetching access token from Wechat server. Error(code:${errcode}): ${errmsg}`));
        } else {
          const newAccessTokenWithExpirationDate = {};
          newAccessTokenWithExpirationDate.accessToken = newAccessToken;
          const now = new Date();
          now.setSeconds(expiresIn);
          newAccessTokenWithExpirationDate.expireDate = now;
          redisClient.hmset('accessTokenWithExpirationDate', newAccessTokenWithExpirationDate);
          callback(null, newAccessToken);
        }
      });
    };
  }
}

export default WeChatAccessTokenSingleton;

import WeChatAccessTokenSingleton from '../helpers/wechat-access-token-fetcher';

const SetWeChatAccessToken = config => (
  (req, res, next) => {
    const accessTokenSingleton = new WeChatAccessTokenSingleton();
    accessTokenSingleton.getAccessToken(config.secret,
      (error, accessToken) => {
        if (accessToken != null) {
          next();
        } else {
          next(new Error(`Not able to get access token: ${error}`));
        }
      });
  }
);

export default SetWeChatAccessToken;

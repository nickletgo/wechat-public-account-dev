import deepFreeze from 'deep-freeze';
import Joi from 'joi';

// Validation Schema
const config = (
  () => {
    const envVarsSchema = Joi.object({
      APPID: Joi.string().required(),
      APPSECRET: Joi.string().required(),
      TOKEN: Joi.string().required(),
      PORT: Joi.number().integer().required(),
    }).unknown().required();

    return Joi.validate(process.env, envVarsSchema, (err, value) => {
      if (err) {
        throw new Error(`Configuration is not valid or complete. Error message: ${err.message}`);
      }
      const {
        APPID: appId,
        APPSECRET: appSecret,
        TOKEN: token,
        PORT: port,
        REDIS_URL: redisUrl,
      } = value;

      return deepFreeze({
        secret: {
          appId,
          appSecret,
          token,
        },
        port,
        redisUrl,
      });
    });
  }
)();

export default config;

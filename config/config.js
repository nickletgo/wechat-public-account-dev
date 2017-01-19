import deepFreeze from 'deep-freeze';
import Joi from 'joi';

// Validation Schema
const getConfig = (callback) => {
  const envVarsSchema = Joi.object({
    APPID: Joi.string().required(),
    APPSECRET: Joi.string().required(),
    TOKEN: Joi.string().required(),
    PORT: Joi.number().integer().required(),
  }).unknown().required();

  Joi.validate(process.env, envVarsSchema, (err, value) => {
    const {
      error,
      APPID: appId,
      APPSECRET: appSecret,
      TOKEN: token,
      PORT: port,
    } = value;

    callback(error, deepFreeze({
      secret: {
        appId,
        appSecret,
        token,
      },
      port,
    }));
  });
};

export default getConfig;

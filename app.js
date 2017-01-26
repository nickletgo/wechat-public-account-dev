import express from 'express';

// Middlewares
import SetWeChatAccessToken from './middlewares/wechat-access-token';
import VerifyClient from './middlewares/server-list-verify';

// Controllers
import getServerList from './controllers/wechat-server-list';
import verify from './controllers/wechat-verify';
import index from './controllers/index';

// Config
import config from './config/config';

const app = express();

const exclude = (path, middleware) =>
  (
    (req, res, next) => {
      if (req.path === path) {
        return next();
      }
      return middleware(req, res, next);
    }
  );

app.use(exclude('/verify', new SetWeChatAccessToken(config)));
app.use(exclude('/verify', new VerifyClient()));

// Routes
app.get('/verify', verify(config));
app.get('/serverlist', getServerList);
app.get('/', index);

app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`));

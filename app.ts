import { Application } from 'egg';
import initLogger from './lib/index';

class AppBootHook {
  app: Application;

  constructor(app: Application) {
    this.app = app;
    this.app.config.coreMiddleware.unshift('setTraceId');
    this.app.httpclient.on('request', (req: any | never) => {
      // 将setTraceId中间件生成的traceId，定义为调用curl时的请求头，形成完整链路
      if (req.ctx.header['x-seewoedu-traceid']) {
        if (req.args.headers) {
          req.args.headers['x-seewoedu-traceid'] = req.ctx.header['x-seewoedu-traceid'];
        } else {
          req.args.headers = {
            'x-seewoedu-traceid': req.ctx.header['x-seewoedu-traceid'],
          };
        }
      }
    });
    app.beforeStart(() => {
      initLogger(app);
    });
  }
}

export default AppBootHook;

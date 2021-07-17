import { Context } from 'egg';
const shortId = require('js-shortid');

export default () => {
  return async function setTraceId(ctx: Context, next: any) {
    const traceId = shortId.gen();
    ctx.header['x-seewoedu-traceid'] = traceId;
    await next();
  };
};

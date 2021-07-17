import { Context } from 'egg';
import { FileTransport, ILoggerLevel } from 'egg-logger';

export interface Meta {
  formatter: () => void;
  code: number;
  ctx: Context;
  pid: number;
  level: string;
  message: string;
  date: string;
}

class CustomFileTransport extends FileTransport {
  private formatter: () => void;

  constructor(options: any) {
    super(options);
    this.formatter = (options && options.formatter) || this.defaultFormatter;
  }

  public log(level: keyof ILoggerLevel, args: any[], meta: Meta) {
    const { formatter } = this;
    if (meta) {
      // eslint-disable-next-line no-param-reassign
      meta.formatter = formatter || meta.formatter;
    }
    if (level === 'ERROR' && typeof args[0] === 'number') {
      const [a1] = args;
      // eslint-disable-next-line no-param-reassign
      meta.code = a1;
    }
    super.log(level, args, meta);
  }

  private defaultFormatter = (meta: Meta) => {
    if (!meta) {
      return '';
    }
    const { ctx } = meta;
    const date = meta.date.replace(',', '.'); // 修改微秒与秒的间隔
    let ctxInfo = '';
    if (ctx && ctx.request && ctx.request.header) {
      const ip = ctx.get('x-real-ip') || ctx.ip;
      const ua = ctx.get('user-agent');
      const traceId = ctx.get('x-seewoedu-traceid');
      const userId =
        ctx.cookies.get('userName', { signed: false }) ||
        ctx.cookies.get('userId', { signed: false });
      const use = ctx.starttime ? Date.now() - ctx.starttime : 0;
      if (ip) {
        ctxInfo += `[${ip}]`;
      }

      if (traceId) {
        ctxInfo += `[traceId:${traceId}]`;
      }

      if (userId) {
        ctxInfo += `[userId:${userId}]`;
      }

      if (ua) {
        ctxInfo += `[${ua}]`;
      }

      if (ctx.url) {
        ctxInfo += `[${ctx.method} ${ctx.url} ${use}ms]`;
      }

      if (meta.code >= 60000 && meta.code < 70000) {
        ctxInfo += `::[serious]`;
      }
    }

    return `[${date}][server][${meta.pid}][${meta.level}]::${ctxInfo}::${meta.message}`;
  };
}

export default CustomFileTransport;

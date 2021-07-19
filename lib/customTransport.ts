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
    this.formatter = options && options.formatter;
  }

  public log(level: keyof ILoggerLevel, args: any[], meta: Meta) {
    const { formatter } = this;
    if (meta) {
      // eslint-disable-next-line no-param-reassign
      meta.formatter = formatter || meta.formatter;
    }
    super.log(level, args, meta);
  }
}

export default CustomFileTransport;

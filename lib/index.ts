import { Application } from 'egg';
import CustomFileTransport from './customTransport';
import { formatLogFileName } from './util';
// eslint-disable-next-line import/order
import path = require('path');

function getLoggerList(app: Application) {
  const { loggers } = app;
  if (!loggers) {
    return [];
  }

  const loggerList: string[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const logger of loggers as any) {
    const loggerName = logger && logger[0];
    if (loggerName) {
      loggerList.push(loggerName as never);
    }
  }
  return loggerList;
}

async function initLogger(app: Application) {
  const config = (app && app.config && app.config.formatLogger) || {};
  const fileDir = config.dir || app.config.logger.dir || `${process.cwd()}/logs`;
  const formatter = config.formatter;
  if (!fileDir) {
    return;
  }

  const loggerList = getLoggerList(app) || [];
  loggerList.forEach(async (loggerName) => {
    const logger = app.getLogger(loggerName);
    if (!logger) {
      return;
    }
    const file = path.join(fileDir, formatLogFileName(app, loggerName));
    const fileTransportOptions = {
      file,
      formatter,
      ...config.fileTransportOptions,
    };
    (logger as any).set('file', new CustomFileTransport(fileTransportOptions));
  });
}

export default initLogger;

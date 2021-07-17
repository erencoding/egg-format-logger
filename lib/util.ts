import { Application } from 'egg';

/**
 * 格式化日志文件名称
 * @param loggerName egg-logger中各个logger的类名
 */
// eslint-disable-next-line import/prefer-default-export
export function formatLogFileName(app: Application, loggerName: string) {
  if (app && app.config && app.config.logger) {
    const { appLogName, coreLogName, agentLogName, errorLogName } = app.config.logger;
    switch (loggerName) {
      case 'logger':
        return appLogName;
      case 'coreLogger':
        return coreLogName;
      case 'errorLogger':
        return errorLogName;
      case 'scheduleLogger':
        return 'egg-schedule';
      case 'agentLogger':
        return agentLogName;
      default:
        return `${loggerName}.log`;
    }
  }
  return `${loggerName}.log`;
}

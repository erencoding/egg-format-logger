import { Application, EggAppConfig, PowerPartial } from 'egg';
const path = require('path');

export default (app: Application) => {
  const config: PowerPartial<EggAppConfig> = {};
  config.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs'),
  }
  return config;
};

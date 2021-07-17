import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  seewoeduLogger: {
    enable: true,
    package: '@seewoedu/egg-seewoedu-logger',
  }
};

export default plugin;

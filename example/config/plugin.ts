import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  formatLogger: {
    enable: true,
    package: 'egg-format-logger',
  }
};

export default plugin;

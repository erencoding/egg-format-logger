import { Application } from 'egg';
import initLogger from './lib/index';

class AppBootHook {
  app: Application;

  constructor(app: Application) {
    app.beforeStart(() => {
      initLogger(app);
    });
  }
}

export default AppBootHook;

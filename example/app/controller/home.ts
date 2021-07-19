import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;

    ctx.logger.info('hello');
    ctx.logger.error('hello');
    ctx.logger.warn('hello');
    ctx.logger.debug('hello');
    ctx.body = await ctx.service.test.sayHi('egg');
  }
}

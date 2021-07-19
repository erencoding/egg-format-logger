# egg-format-logger
[English](./README.md) | 简体中文
## 介绍
用于格式化打印日志的egg插件。
此插件与 [egg-logger](https://github.com/eggjs/egg-logger) 协同工作。
## 安装
```
npm i egg-format-logger --save
```
## 配置
更改`${app_root}/config/plugin.js`启动插件
```js
exports.formatLogger = {
  enable: true,
  package: 'egg-format-logger',
};
```
插件的配置信息位于`${app_root}/config/config.default.js`
```js
config.formatLogger = {
  formatter: (meta) => {
    return  `[${meta.date}][${meta.pid}][${meta.level}][${meta?.ctx?.response?.status}]::${meta.message}`;
  }
}
```
#### Meta
| 属性 | 说明 |
| -- | -- |  
| ctx | [Egg的Context对象](https://eggjs.org/zh-cn/basics/objects.html#context) |
| paddingMessage | 部分请求信息，包含域名、请求耗时、请求方法 |  
| level   | 日志级别 |  
| date   | 当前时间 |  
| pid   | 进程ID |  
| hostname  | 主机名 |  
| message | 需打印的日志信息 |

## License
[MIT](./LICENSE)

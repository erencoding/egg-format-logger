# egg-format-logger
English | [简体中文](./README-zh_CN.md)
## Introduced
An egg plugin for formatting logs. This plugin and [egg-logger](https://github.com/eggjs/egg-logger) to work together.
## Install
```shell
npm i egg-format-logger --save
```
## Configuration
Change `${app_root}/config/plugin.js` to to enable this plugin.

```js
exports.formatLogger = {
  enable: true,
  package: 'egg-format-logger',
};
```

Configure information in `${app_root}/config/config.default.js  `
```js
config.formatLogger = {
  formatter: (meta) => {
    return  `[${meta.date}][${meta.pid}][${meta.level}][${meta?.ctx?.response?.status}]::${meta.message}`;
  }
}
```
#### Meta
| property | description |
| -- | -- |  
| ctx | [Egg.Context](https://eggjs.org/en/basics/objects.html#context) |
| paddingMessage | Part of the request information, including the domain name, request time, request method |  
| level   | The level of logging |  
| date   | The current time |  
| pid   | The process ID |  
| hostname  | The host name |  
| message | Log information to be printed |

## License
[MIT](./LICENSE)

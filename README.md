# @seewoedu/egg-seewoedu-logger
## Introduction
教师发展部使用的日志打印egg插件
## Install
```
npm i @seewoedu/egg-seewoedu-logger --registry=http://nexus.gz.cvte.cn/nexus/repository/npm-group/ --save
```
## Usage
##### 开启插件
```
// config/plugin.js
exports.seewoeduLogger = {
  enable: true,
  package: '@seewoedu/egg-seewoedu-logger',
};
```
## Description
##### 日志格式
```
[时间][进程ID][日志级别]::[客户端IP][traceId][用户ID][User Agent][请求方法 请求连接 请求用时]::具体信息
```
ps: 如果数据项为空则不显示

## Example
```
ctx.logger.error('打印一个错误');
```
## Test

```
```

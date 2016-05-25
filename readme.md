# blear.core.flexible

[![npm module][npm-img]][npm-url]
[![build status][travis-img]][travis-url]
[![coverage][coveralls-img]][coveralls-url]

[travis-img]: https://img.shields.io/travis/blearjs/blear.core.flexible/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/blearjs/blear.core.flexible

[npm-img]: https://img.shields.io/npm/v/blear.core.flexible.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/blear.core.flexible

[coveralls-img]: https://img.shields.io/coveralls/blearjs/blear.core.flexible/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/blearjs/blear.core.flexible?branch=master


## 用法
```
npm install -S blear.core.flexible
```

```
<head>
<script src="/node_modules/blear.core.flexible/src/index.js">
</head>
```

## 接口
全局注册 `flexible`。

### `flexible.value`
当前的 html fontSize 计算值。


### `flexible.px2rem(px)`
像素大小计算为 rem 大小。


### `flexible.rem2px(rem)`
rem 大小计算为像素大小。


### `flexible.onChange(fn)`
监听 html fontSize 的变化。


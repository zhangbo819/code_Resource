# React源码学习

原链接[我是怎么学习React源码的](https://juejin.cn/post/6903335881227108366)

## 项目

by create-react-app

## install react-app-rewired

```npm

yarn add react-app-rewired --save-dev

```

## 生成config-overrides.js

```sh

touch config-overrides.js

```

内部

```js

/* config-overrides.js */

module.exports = function override(config, env) {
  // do stuff with the webpack config...
  config.externals = {
    'react': 'window.React',
    'react-dom': 'window.ReactDOM',
  };
  return config;
}

```

## 下载React的cdn的js文件(后缀版本可换)

```sh

cd public
wget https://cdn.jsdelivr.net/npm/react@17.0.1/umd/react.development.js


```

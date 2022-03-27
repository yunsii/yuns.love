---
title: TypeScript + React + Umi + Dva 开发入门之环境搭建
date: '2019-06-23 16:09:53'
tags: [学习笔记, TypeScript, React]
draft: false
summary: 由于兼职的项目需要拓展更为复杂的功能，虽然已经借着从 material-ui 改为 antd 的契机重构了一次，但是仍然不让人满意。
layout: PostSimple
---

## 前言

由于兼职的项目需要拓展更为复杂的功能，虽然已经借着从 material-ui 改为 antd 的契机重构了一次，但是仍然不让人满意。

恰好在公司开发的时候使用了快三个月的 ant-design-pro ，一顿体验下来，感觉很 ok ，特别是 modal 与 page 的搭配，感觉是真滴顺手。遂决定采用 Umi 和 Dva 来再次重构一下，再借着本次机会直接采用 TypeScript 开发整个项目。那么，现在就从环境搭建开始吧。

## 环境搭建

```shell
$ npm install create-umi -g
```

通过 Umi 官网的 [通过脚手架创建项目](https://umijs.org/zh/guide/create-umi-app.html#%E4%BB%8B%E7%BB%8D-create-umi)初始化项目。

- yarn create umi [appName]
- 选择 app
- 启用 typescript
- 选择 antd 、 dva 和 internationalization
- yarn
- yarn start

启动成功之后就可以开始大刀阔斧的操作了。

### tsconfig.json

```json
{
  "experimentalDecorators": true
}
```

### umi-request

因为使用 ant-design-pro 而使用了 umi-request ，发现这个基于 fetch 封装的工具也是真好用啊，但是好像 Umi 不自带，所以 `yarn add umi-request` 安装一哈。

### .umirc.ts

```ts
const config: IConfig = {
  treeShaking: true,
  define: {
    'process.env.param': 'value', // 配置环境变量
  },
  lessLoaderOptions: {
    // Less 配置，修改 antd 主题
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#009688',
      '@font-family':
        "-apple - system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans- serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    },
    paths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src'),
    ],
  },
  plugins: [
    // 官方插件配置
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'eler',
        dll: false,
        locale: {
          enable: true,
          default: 'en-US',
          baseNavigator: true,
        },
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  chainWebpack(config) {
    // 刚开始配置了 lessLoaderOptions 以为没生效，所以使用这个配置了一波。后来才知道原来得使用 css-modules 的方式使用才行，即： import styles from 'styles.less';
    // config.resolve.extensions
    //   .add('.tsx');
    // config.module.rule('less-loader')
    //   .test(/\.less$/)
    //   .use('less-loader')
    //   .loader(require.resolve('less-loader'))
    //   .options({
    //     javascriptEnabled: true,
    //     modifyVars: {
    //       '@primary-color': '#009688',
    //       '@font-family': '-apple - system, BlinkMacSystemFont, \'Segoe UI\', \'PingFang SC\', \'Hiragino Sans GB\', \'Microsoft YaHei\', \'Helvetica Neue\', Helvetica, Arial, sans- serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\'',
    //     },
    //     paths: [
    //       path.resolve(__dirname, 'node_modules'),
    //       path.resolve(__dirname, 'src'),
    //     ],
    //   });
  },
  routes: [
    // 配置路由
    //...
  ],
}
```

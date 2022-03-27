---
title: 从 Jekyll 迁移到 Hexo 初体验
date: '2019-04-05 23:06:58'
lastMod: '2019-04-08 09:59:13'
tags: [Hexo, Travis CI]
draft: false
summary: 刚入门 Jekyll ，准备好好深入学习的时候，一个朋友就跟我谈到 Hexo ，听起来好像更有意思些。毕竟 Jekyll 是用 Ruby 写的，虽然对使用博客主题来说也没有什么影响，但是写好博客想本地测试的时候就很尴尬了，必须得装个 Ruby 的环境才行。虽然刚入门 Jekyll 的时候我已经装了，但是就体验来说很不流畅。另一方面，现在我也转型前端工程师了，主要都是用 Node.js 。 Hexo 就是用 Node.js 写的，这简直不要太棒了，二话不说，直接迁移。
layout: PostSimple
---

## 前言

刚入门 Jekyll ，准备好好深入学习的时候，一个朋友就跟我谈到 Hexo ，听起来好像更有意思些。毕竟 Jekyll 是用 Ruby 写的，虽然对使用博客主题来说也没有什么影响，但是写好博客想本地测试的时候就很尴尬了，必须得装个 Ruby 的环境才行。虽然刚入门 Jekyll 的时候我已经装了，但是就体验来说很不流畅。另一方面，现在我也转型前端工程师了，主要都是用 Node.js 。 Hexo 就是用 Node.js 写的，这简直不要太棒了，二话不说，直接迁移。

## 迁移

没什么事儿是一帆风顺的，果然是会出些岔子的，这里做些简单的记录。

我的写作分支是 hexo ，部署分支为 master。先说明一下现目前的主要技术栈：

- Hexo（框架）
- NexT（主题）
- Travis CI（持续集成）

然后该谈谈踩过的坑了。

### [NexT](https://github.com/theme-next/hexo-theme-next)

```bash
git clone https://github.com/theme-next/hexo-theme-next themes/next
```

刚开始以为和 Jekyll 一样，克隆一个主题仓库在此基础上修改就行了。所以直接把 `hexo init` 创建的项目删了，真是自作聪明啊。后来才知道 Hexo 是一个插件化的框架，主题也是一个插件。另外仔细一看，克隆主题的时候有写克隆到 `themes/next` ，真是个悲伤的故事。

```bash
hexo server
```

项目算是跑起来了。

然后就是一些页面配置了。分类、标签、关于都得通过 `hexo new page <name>` 初始化以后才能通过主题看到页面，奇怪的是归档不需要。此外 `NexT 7.1.0` 主题自带了很多功能了，有些根本用不着像网上的文档那样去一一添加了，像我想添加的不蒜子（博客浏览统计）、 gitalk（评论系统），官方文档都说了怎么使用了，所以，[官方文档](https://theme-next.org/docs/)真的很重要。当然，甚至能直接在主题的 `_config.yml` 中查看有哪些功能可供使用。

最后就是搞定 emoji 渲染的问题了，一顿折腾，最后是卸载了默认的 markdown 渲染引擎 `hexo-renderer-marked` ，替换为 `hexo-renderer-markdown-it` 搞定。附带的需要安装插件 `markdown-it-emoji` ，并在根目录下的 `_config.yml` 中添加配置：

```yml
# Markdown-it config
## Docs: https://github.com/celsomiranda/hexo-renderer-markdown-it/wiki
markdown:
  render:
    html: true
    xhtmlOut: false
    breaks: false
    linkify: true
    typographer: true
    quotes: '“”‘’'
  plugins:
    - markdown-it-abbr
    - markdown-it-footnote
    - markdown-it-ins
    - markdown-it-sub
    - markdown-it-sup
    - markdown-it-emoji ## add emoji
  anchors:
    level: 2
    collisionSuffix: 'v'
    # If `true`, creates an anchor tag with a permalink besides the heading.
    permalink: false
    permalinkClass: header-anchor
    # The symbol used to make the permalink
    permalinkSymbol: ¶
```

好了，功能齐全就该部署了，安装 `hexo-deployer-git` 后配置 `_config.yml` :

```yml
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repo: https://github.com/name/name.github.io
  branch: master
  message:
```

值得注意的是选好分支，其次是 message 留空才会使用 Hexo 框架的默认值。至此，`hexo deploy` 完成部署，第一次需要手动登录。

最后，贴一下项目依赖:

```json
{
  "dependencies": {
    "hexo": "^3.8.0",
    "hexo-deployer-git": "^1.0.0",
    "hexo-generator-archive": "^0.1.5",
    "hexo-generator-category": "^0.1.3",
    "hexo-generator-index": "^0.2.1",
    "hexo-generator-tag": "^0.2.0",
    "hexo-renderer-ejs": "^0.3.1",
    "hexo-renderer-markdown-it": "^3.4.1",
    "hexo-renderer-stylus": "^0.3.3",
    "hexo-server": "^0.3.3",
    "markdown-it-emoji": "^1.4.0"
  }
}
```

### [Travis CI](https://travis-ci.org/)

之前完成的只是一个基于 Hexo 的基础博客系统，得自己手动部署，不能像之前使用的 Jekyll 引擎那样由 Github Pages 后台自动完成编译。所以呢，就该 Travis CI 登场了。其目的就是达到了和使用 Jekyll 同样的效果，通过 git 提交之后不用自己再手动部署了，虽然这也只是一句命令的事儿。

#### 弯路

搜到的第一个教程是通过 ssh 连接到博客仓库，所以弯路开始了。

首先使用了以下的命令生成密钥对

```bash
ssh-keygen -t rsa -C "youremail@example.com"
```

然后将公钥与博客仓库绑定，并允许写入。再在项目根目录下新建一个文件夹 `.travis` ，再在其中通过 `gem install Travis` 安装一个 Travis CI 的命令行工具，再通过已注册 github 帐号登录之后，使用 `Travis encrypt-file .\ssh-key --add` 加密私钥文件。然后还得在根目录下的 `.travis.yml` 配置脚本解密私钥再通过 ssh 让 Travis CI 能够写入数据。

思路应该是 OK 的，可是我怎么都没成功，卡在私钥解密的环节。不是解密时找不到文件就是解密出了问题，找不到文件能解决，但是这个解密出了问题真的无语，遂 google 了一下，发现了 [Encryption/decryption doesn't work well between two different openssl versions](https://stackoverflow.com/questions/39637388/encryption-decryption-doesnt-work-well-between-two-different-openssl-versions/39641378#39641378) ，所以猜测难道是我本地加密和 Travis CI 上的版本不同导致的。又由于 `ssh-keygen` 是 `git` 附带的命令，所以我将我 Windows 上的 git 版本从 2.20.X 降级到 2.15.1 跟 Travis CI 上的 Linux 下的 git 版本一致。再次生成密钥对，还是解密有问题（肯定替换了仓库的公钥的），折腾了好久，后来看到有用 github 的 token 的方式来读写仓库，所以暂时中断了继续走 ssh 这种方式。

#### 曙光

通过在 [Personal Access Tokens](https://github.com/settings/tokens) 中配置 token ，注意权限控制，我给了仓库的权限。然后再在 Travis CI 的博客仓库的设置中添加环境变量，用于存储该 token 。

之后就都不用 `.travis` 文件夹了，直接配置 `.travis.yml` 和 `_config.yml` 即可，在 `.travis.yml` 中不用解密私钥了，关键配置如下：

```yml
script:
  - hexo clean
  - hexo generate

after_script:
  - git config user.name "nickname"
  - git config user.email "youremail@example.com"
  # 替换同目录下的_config.yml文件中gh_token字符串为travis后台刚才配置的变量，注意此处sed命令用了双引号。单引号无效！
  - sed -i "s/github_token/${github_token}/g" ./_config.yml
  - hexo deploy
```

然后就是 `_config.yml` 中的部署配置了，就是将部署方式改为 token 调用 api 的方式。配置如下：

```yml
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  # repo: https://github.com/nickname/nickname.github.io # hexo-deployer-git 使用的方式（帐号登录）
  repo: https://github_token@github.com/nickname/nickname.github.io
  branch: master
  message:
```

这种方式很快就搞定了，看起来也比 ssh 的方式简单多了。

#### 小结

捋了一遍之后，发现，最好的方式应该还是 ssh 好一些，那样才能做到权限最小化嘛。回过头来，发现 token 的话是功能点上权限控制了，像我配置就是仓库的读写权限了，而不是针对某一个仓库的。如果是使用插件 `hexo-deployer-git` ，第一次还得登录，那岂不是所有权限了？所以现在的方式还是有所进步嘛，有时间再研究下 ssh 的方式吧。

## 总结

通过今天的学习，算是了解了之前一直听闻的 **CI** 这么一个东西。其次，现目前的博客系统也只是做到了跟 Jekyll 差不多的效果，只是主题上具有更强的扩展性，现目前看来。往后如果有必要，应该还得画个图来研究一下两种方式的流程和相关细节。

进阶的话应该就是再结合[语雀](https://www.yuque.com)实现文章发布后自动部署了，现目前的先凑合凑合用吧，这两天都折腾这个迁移，有点太累了，要是不迁移不就没这些事儿了吗，好像是这么个道理。

我啊，真是爱折腾。

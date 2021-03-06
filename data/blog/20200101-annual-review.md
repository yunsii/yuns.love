---
title: 2019 年度总结
date: '2020-01-01 12:32:20'
tags: [随笔, 年度总结]
draft: false
summary: 现在的时间是过得真的快，我记得我第一次有意识的琢磨时间的时候都已经七八月份了。从去年膨胀的想转行前端，今年有幸自己主导了技术栈，从 Ant Design Pro 入手，算是深入了解了前端的种种。
layout: PostSimple
---

现在的时间是过得真的快，我记得我第一次有意识的琢磨时间的时候都已经七八月份了。从去年膨胀的想转行前端，今年有幸自己主导了技术栈，从 [Ant Design Pro](https://github.com/ant-design/ant-design-pro) 入手，算是深入了解了前端的种种。

年初刚到深圳的时候自信满满，前端和 Python 都有投，折腾一段时间后有点慌了，没有工作经验确实很尴尬，但是毕业以来对自己学习能力还是越来越自信的。三周过去了，终于收到了一家公司的前端 offer ，本来也打算再看看，但是都没啥别的消息了，对方又在催了，索性就直接敲定了。接触下来还是感觉来对了，虽然稍微累了点。

刚开始，是合作开发一个 H5 应用，我引入了 [redux](https://github.com/reduxjs/redux) ，又基于 fetch 简单封装了一套工具方法，本着绝不写重复代码的精神，努力做着能力范围内的封装。随后被安排独立开发一个后台管理系统，由于之前开发的系统被诟病，所以叫我找找有没有成熟的解决方案。我也有提到过之前使用的 UI 框架 [material-ui](https://github.com/mui-org/material-ui) ，但是为了保证一致性，还是采用了 [ant-design](https://github.com/ant-design/ant-design) 。那么就开始摸索了，好巧不巧，最后关头（不然估计得从之前诟病的系统二次开发了）发现了脚手架 [Ant Design Pro](https://github.com/ant-design/ant-design-pro) ，一切就开始柳暗花明了。

正是因为 Ant Design Pro 这一契机，开始构建了自己的前端理论体系，之前都是零散的技术拼装，没有一个整体的概念。本来以为可以安静的在这个脚手架上写写业务逻辑就完事了，谁知道要加一个标签页的功能，我寻思脚手架都没有肯定有它的道理的，但是经过和同事交流，发现标签页功能还是挺有用的。所以就开始硬着头皮研究要怎么搞，毕竟当时自己是一点思路都没有。这个标签页的功能也是耗费了巨大的心力，最后直接通过路由实现的标签页功能才算较为完美的解决了这个问题，详情可见[基于 ant design pro 2.3.1 页面标签化展示的研究与实现](/2019/07/06/2019-07-06-ant-design-pro-tabs-page-by-route/)。

由于经常需要写表单和增删改查这些逻辑，标签页的功能稳定后又想着把表单和增删改查的功能抽象出来。不知道是我搜索的方式不对还是咋回事，没找到类似的组件，只好又硬着头皮研究怎么打包发布自己的组件，从零开始虽然有难度，但是每个环节都能找到不少文章可以学习，最后废了九牛二虎之力，形成了用 [storybook](https://github.com/storybookjs/storybook) 渲染组件， [webpack](https://github.com/webpack/webpack) 编译打包， [release-it](https://github.com/release-it/release-it) 发布的一套流程。基于此，开发了基于 ant-design 的表单组件 [antd-form-mate](https://github.com/zpr1g/antd-form-mate) ，基于 ant-design 和 [dva](https://github.com/dvajs/dva) 的增删改查组件 [antd-curd](https://github.com/zpr1g/antd-curd) 。

PC 端刚熟练的时候，又安排独立开发一个 H5 应用。所以琢磨着模仿 Ant Design Pro 的技术栈，搞了一个移动端脚手架 [ant-deisgn-mobile-pro](https://github.com/zpr1g/ant-design-mobile-pro) ，又基于移动端的特性做了高清方案适配以及抽象了表单等一些基础组件。

一套组合拳下来，业务逻辑上的问题应该不大了，重点解决了业务逻辑开发中的一些痛点，以后遇到问题解决问题就行了。PC 端和移动端两开花，应该也算是游刃有余了，特别是在 [TypeScript](https://github.com/microsoft/TypeScript) 加持之后。像 📊 **图表**、 🗺️ **地图**和 📺 **多媒体**的使用，还得加深理解才行。还有很重要的一点就是前端的**自动化测试**，一直都想弄的，可惜时间太紧了，一直没时间搞。

虽然很有激情写代码，但是劳逸结合也很重要：

- 👨‍💻 **双拼** - 打字老想着把拼音打全，所以用全拼打字很纠结。想想从初中那会儿就用金山打字通学习了全拼，虽然也曾想学习五笔，但是看着就头大，所以一直用全拼打到今年五一。大概是实在觉得打字太慢了，突然心血来潮想换一个船新的体验试试，所以五一入门了小鹤双拼之后一直就用双拼了，学会了之后的成就感与兴奋感是空前的，毕竟强行中断了差不多 8 年的打字习惯 😆 虽然打字还是会因为偶尔想不起按键和不知道拼音而尴尬，但是感觉流畅性上好了很多，整个人都舒服了不少 \_(:3J∠)\_
- 😎 **个人博客** - 倒腾了个自己的博客网站，能偶尔写点东西
- 🎓 **看了几本书** - 《自学是门手艺》《代码整洁之道》《重构，改善既有代码的设计》《码农翻身》，能收获一二
- 😀 **看了几部番剧** - 《青春猪头少年不会梦到兔女郎学姐》《紫罗兰永恒花园》《我们无法一起学习》《欢迎来到实力至上主义的教室》《少年歌行》《星辰变》《刀剑神域》《灵笼》《一人之下》《这个勇者明明超强却过分慎重》，原来这就是二次元吗？爱了爱了。电视剧和综艺啥的好久都没看过了
- 👀 **观视频** - 生活不能只顾眼前，更要关心一下国家大事、国际局势，所以这是一个我了解世界的渠道和窗口
- 💃🏼 **演唱会** - 看了人生中的第一场演唱会， 48 还挺有趣的

综上，今年比起去年也称得上是收获满满的一年了，自我感觉还是很满意的，除了钱包以外 \_(:3J∠)\_ 年轻人还是应该朝气满满的，即使偶尔失意伤感，也应该着眼未来，为了自己，为了家庭，为了社会，为了中国梦，为了人类命运共同体。所以，几乎每天我都告诉自己，**“今天也是元气满满的一天！”**（至于哪儿学来的，有点忘却了，应该是 48 吧，哈哈哈），那么，本命年已过，新的一年又有哪些新目标呢？

- 🏃‍ **健身** - 身体是革命的本钱。入冬以后把每周的 Keep 都砍掉了，明年得再加一个慢跑
- 🧾 **背单词** - 英语真的很重要，每次读英文文档还是有些吃力的。入冬前都用 AnkiDroid 背到 E 了，还记得以前好几次 A 都没背几个就没了 \_(:3J∠)\_
- 📝 **每周一文** - 争取每周能写一个博文，内容不限
- 🔨 **每周一题** - 算法与数据结构，每周至少在 leetcode 做一道题
- 🤖 **QQ 机器人** - 重拾 Python ，一年没怎么写 Python 了，对于 QQ 机器人依然激情依旧
- 🧠 **AI 入门** - 现在人工智能过于火爆了，有必要了解一下，初步打算结合 QQ 机器人来实践
- 📐 **数学** - 毕业之后偶尔会看一下高数、线性代数和概率论，但是每次都三分钟热情，毕竟基础还是太薄弱了，悔不当初啊。明年看看能不能结合 AI 也把数学入门了
- 💎 **跨平台 APP** - 学习 Flutter ，开发一个原生 APP ，感觉未来 APP 的跨平台开发应该是一个不错的方向
- 🌊 **看海** - 来深圳一年了，还没去看海呢，真是个浪人

2020，继续加油 \_\_\_\_\_🏃\_

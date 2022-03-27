---
title: Github Pages 自定义域名
date: '2019-04-29 19:55:56'
tags: [Github, Github Pages]
draft: false
summary: 昨天刚好收到自己一年前注册的域名 zpr1g.top 即将过期的消息，思来想去感觉这个域名挺好的，而且 Github Pages 支持自定义域名。所以就续费了，又是好一顿折腾。
layout: PostSimple
---

## 前言

昨天刚好收到自己一年前注册的域名 zpr1g.top 即将过期的消息，思来想去感觉这个域名挺好的，而且 Github Pages 支持自定义域名。所以就续费了，又是好一顿折腾。

## 折腾

昨晚开始研究，看了几篇国内的文章，类似掘金、CSDN 之类的，写得都不够简直直接，未果，然后又看了看 Github Pages 的官方文档。类似 [Using a custom domain with GitHub Pages](https://help.github.com/en/articles/using-a-custom-domain-with-github-pages) 这样的，也不够简单直接，跳转了几个网页也没太弄明白，倒是了解了一个 DNS 域名解析配置中的 `CNAME` 、`ANAME` ，未果。

今早赶车途中又研究了一下，发现了一篇很直接的文章 [Using custom domain for GitHub pages](https://medium.com/@hossainkhan/using-custom-domain-for-github-pages-86b303d3918a) ，到了公司赶紧测试了一下，三下五除二就搞定了，心情一下子就愉悦了起来。现在简单总结一下：

1. repo - Settings - Github Pages - Custom domain ，设置好自己的顶级域名（例如： example.com ）。
2. 在购买域名的平台上添加记录类型为 `A` 且 IP 分别为 `185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153` 的解析记录。
3. 为 www 的子域名添加 `CNAME` 解析记录到 Github Pages 的域名，而且要在末尾加上一个 `.`（例如： `user.github.io.` ）。

完成。以上配置的四个解析 IP 在我昨晚看的官方文档 [Setting up an apex domain](https://help.github.com/en/articles/setting-up-an-apex-domain) 中出现过。其次就是 medium 的那篇文章末尾提到需要使用 https ，虽然能够访问了，我还是弄了一个免费的 SSL 证书，本来想用 [LETS ENCRYT](https://letsencrypt.org/) ，奈何我使用的阿里云平台不支持，看了 LETS ENCRYPT 的文档，不是官方支持的话证书也会每年过期，所以就用了阿里云上 Symantec 提供的免费证书，结果签发下来我访问网站后查看证书详情颁发者 Let's Encrypt Authority X3 ……

## 总结

之前刚买域名的时候看到配置就头大，现在回过头来看看很多东西都自然而然的理解了，多学多用才是真理。好了，终于让几近荒废的域名有了用武之地。

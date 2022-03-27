---
title: 《重构 改善既有代码的设计》 读书笔记（1）
date: '2019-04-02'
lastMod: '2019-04-08 09:59:06'
tags: [读书笔记, 重构]
draft: false
summary: 书到了就迫不及待细细品味了。看完前言我就觉得这的确是本好书，至少思想我是非常赞同的。我也曾面对一堆烂摊子想把它重构的心，但只能苦于自己的思想和能力有限，仅能做些许改造了。
layout: PostSimple
---

![](http://ww1.sinaimg.cn/large/005Ouxuxgy1g1omsp9johj33281j4u0x.jpg)

## 说在前面

书到了就迫不及待细细品味了。看完前言我就觉得这的确是本好书，至少思想我是非常赞同的。我也曾面对一堆烂摊子想把它重构的心，但只能苦于自己的思想和能力有限，仅能做些许改造了。

今天开始就好好学习这门手艺吧。

## 有感于前言

> ...毕竟程序看上去还可以运行，而且项目面临很大的进度压力。于是项目经理说，晚些时候再抽时间做这些整理工作。

从我毕业以来，虽然也没多少工作经验，但听到的和感受到的都是这种感觉，明知现有结构存在很大的弊病，但是总用时间紧来搪塞。于我看来，这只是对自己，对将来的不负责。不停在垃圾代码上堆砌垃圾，虽然能用，最后也只是对维护和升级的无尽折磨。

> 所谓重构（refactoring）是这样一个过程：在不改变代码外在行为的前提下，对代码做出修改，以改进程序的内部结构。重构是一种经千锤百炼的有条不紊的程序整理方法，可以最大限度地减小整理过程中引入错误的概率。本质上说，重构就是在代码写好之后改进它的设计。

文中也提到在软件开发的大部分历史时期，大部分人相信应该先设计而后编码，但是就连这个理念我都没能深入体会得到。所经历的大都可以理解为看了需求就动手开发，或许这就是敏捷开发吧。

> 随着时间流逝，人们不断修改代码，于是根据原先设计所得的系统，整体结构逐渐衰弱。代码质量慢慢沉沦，编码工作从严谨的工程堕落为胡砍乱劈的随性行为。

所以啊，本该是一个严谨的工程，却被视为“能用就行”？我是不能理解的。在原本就没有较好的设计基础之上，又不重构混乱的代码，这样的项目何谈生命力呢？所以我非常同意文中的下述观点。

> 哪怕手上有一个糟糕的设计，甚至是一堆混乱的代码，我们也可以借由重构将它加工成设计良好的代码。

## 总结

世上无难事，只怕有心人。当然更要讲究方式方法，才能事半功倍。
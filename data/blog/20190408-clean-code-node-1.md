---
title: 《代码整洁之道》 读书笔记（1）
date: '2019-04-08 21:52:40'
tags: [读书笔记, 代码整洁之道]
draft: false
summary: 一直都听闻这本书，这次终于买了。为了成为一个更好的程序员，很多东西都得去了解，站在前人的肩膀之上总比自己摸石头过河要好很多了。
layout: PostSimple
---

![20190408_215408.jpg](https://i.loli.net/2019/04/08/5cab5388177a6.jpg)

## 说在前面

一直都听闻这本书，这次终于买了。为了成为一个更好的程序员，很多东西都得去了解，站在前人的肩膀之上总比自己摸石头过河要好很多了。

## 序

> 认真对待每个变量名。你当用为自己第一个孩子命名般的谨慎来给变量命名。

如何简洁明确的表达含义？变量命名很值得研究。

> 无论是架构还是代码都不强求完美，只求竭诚尽力而已。

所有才有童子军军规那样的“让营地比你来时更干净”。

## 第 1 章 整洁代码

### 糟糕的代码

> 我们都曾经瞟一眼自己亲手造成的混乱，决定弃之而不顾，走向新一天。我们都曾经看到自己的烂程序居然能运行，然后断言能运行的烂程序总比什么都没有强。我们都曾经说过有朝一日再回头清理。当然，在那些日子里，我们都没听过勒布朗（ LeBlanc ）法则：稍后等于永不（ Later equal never ）。

太真实了。说到烂程序就想起我之前写的贴吧爬虫，那时候刚入门 Python 就一顿瞎折腾，最后算是差强人意，够用了，也在贴吧水了一波经验。自己回头看代码也是真的太烂了，但是就是能运行。说着有时候重构一下，结果现在大概连源码都找不到了。工作以来这种事儿看起来也很平常了，项目上线了谁还管你代码烂不烂了，反正都是下一拨人的锅了。所以啊，打心底里我的想法还是从一开始就设计好，至少如前面所说的尽最大努力，而不是草草了事。

### 混乱的代价

> 随着混乱的增加，团队生产力也持续下降，趋向于零。

> 程序员遵从不了解混乱风险的经理的意愿，也是不专业的做法。

之前在做 Java 的时候，也要涉及一些前端页面，那时候使用 Ext.js 写的。神奇的一个查看一个修改的两个功能页面居然是两个模块函数，明明只有细微的权限区分而已啊。当时问了他人我是不是给它重构一下，都说就在上边改吧……我可受不了自己写这么烂的代码，所以我还是硬着头皮给它合并重构了，整个人都舒服了。

> 制造混乱**无助于**赶上期限。混乱会立刻拖慢你，叫你错过期限。赶上期限的唯一方法 ── 做得快的唯一方法 ── 始终尽可能保持代码整洁。

> 写整洁代码，需要遵循大量的小技巧，贯彻刻苦习得的“整洁感”。这种“代码感”就是关键所在。

**代码感**这三个字很精髓了。

> 读与写花费时间的比例超过 10:1 。写新代码时，我们一直在读旧代码。

> 既然比例如此之高，我们就想让读的过程变得轻松，即便那会使得编写过程更难。没可能光写不读，所以使之易读也使之易写。

这个点破的也很精髓，易读才能易写，互相促进才能使得编码不至于那么晦涩。

> 要想干得快，要想早点做完，要想轻松写代码，先让代码易读吧。

## 第 2 章 有意义的命名

### 名副其实

> 我们应该选择指明了计量对象和计量单位的名称
>
> ```java
> int elapsedTimeInDays;
> int daysSinceCreation;
> int daysSinceModification;
> int fileAgeInDays;
> ```

### 使用读得出来的名称

### 使用可搜索的名称

### 每个概念对应一个词

fetch retrieve get

### 别用双关语

add

## 第 3 章 函数

### 短小

> 20 行封顶最佳。

> 函数的缩进层级不该多于一层或两层。

### 只做一件事

> 函数应该做一件事。做好一件事。只做一件事。

刚开始学习编程讲函数就是用来做一件事的，可是真正做到的大概就微乎其微了。

### 每个函数一个抽象层级

> 程序员往往很难学会遵循这条规则，写出只停留于一个抽象层级上的函数

自顶向下读代码，想做到这个做事有些难度啊。TO 起头段落，也就是说为了做什么，需要干什么。这样不断的重复，直到完成整个流程。

### 使用描述性的名称

### 函数参数

> 最理想的函数参数是零。

> 如果函数看来需要两个、三个或三个以上参数，就说明其中一些参数应该封装为类了。

### 无副作用

仅具有函数名称的功能，不该具有别的副作用。

案例：今天突然发现自己写的一个函数名叫做 `requestOrganList()` ，意为请求机构列表信息，然后我在处理响应结果的时候顺便增加了一个默认选择第一个机构的功能。多亏今天遇到的 bug 让我发现了这个问题。不过这个问题是在看这本书之前就遗留的了，也说明自己之前是考虑多么不周到，以后要多加小心了。

### 分割指令与询问

> 函数要么做什么事，要么回答什么事，但二者不可得兼。

set 和 get 大概是最能说明的两个函数了。

### 使用异常替代返回错误码

最好把 try 和 catch 代码块的主体部分抽离出来，另外形成函数。

### 别重复自己

这个大概是我践行的最好的了吧。

### 结构化编程

### 如何写出这样的函数

反复打磨，字斟句酌。

> 我并不从一开始就按照规则写函数。我想没人做得到。

### 小结

> 编程艺术是且一直就是语言设计的艺术。

> 真正的目标在于讲述系统的故事，而你编写的函数必须干净利落地拼装到一起，形成一种精确而清晰的语言，帮助你讲故事。

## 第 4 章 注释

> 注释的作用是解释未能自行解释的代码。如果注释本身还需要解释，就太遗憾了。

> 短函数不需要太多描述。为只做一件事的短函数选个好名字，通常要比写函数注释要好。

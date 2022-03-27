---
title: 《自学是门手艺》 读书笔记（2）
date: '2019-04-11 07:43:18'
tags: [读书笔记, 自学是门手艺]
draft: false
summary: 笨拙与耐心
layout: PostSimple
---

## 第二部分

### [笨拙与耐心](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.2.A.clumsy-and-patience.ipynb)

> 每次自学什么新东西的时候，你就把自己想象成 “再次出生的婴儿” —— 其实每次自学，的的确确都是重生。一旦掌握了一项新的技能，你就不再是从前的那个自己，你是另外一个人了。
>
> 看着婴儿蹒跚学步，的确笨拙，但谁会觉得它不可爱呢？
>
> 同样的道理，刚开始用一个技能的时候，笨拙其实就是可爱 —— 只不过这时候旁人不再这么觉得而已了，只不过因为你披着一张成年人的皮。然而，你的大脑中正在学习的那一部分，和新生婴儿的大脑没有任何区别。

这个比喻确实很贴切，也想起来自己刚学 Python 的时候的各种笨拙，但是坚持总会有进步的，虽然那时候都是看的非官方文档*(:3J∠)*

想起来自己看了简单的教程就开始用 requests 和 BeautifulSoup 硬写爬虫的时候。编码问题是我遇到的最头疼的问题， encode 、 decode 翻来覆去都是乱码，真是让人抓狂，虽然现在也还没有一个特别清晰的认识，但是应该能快速解决了。所以找个时间好好总结一下编码问题吧。

> 一切 “主要靠时间” 的活动都一样，都需要在从事之前认真做 “心理建设”。通常情况下，读一本教程，上个学习班，就 “会” 了 —— 几乎肯定是错觉或者幻觉。

突然想起来本科的时候教我们 C++ 的老师的一句话，大致意思是敲一万行的代码之后就熟能生巧了。大概这也算是过早引入吧，当时不以为意。现在才发现代码量上去了很多东西就自然而然了，当然还得搭配学习，相辅相成。

> 离开学校之后，绝大多数人很难再有 “一看一下午”、“一练一整天”、“一玩一整夜” 的本钱。又由于生活的压力越来越大，对 “能够使用” 新技能的 “需求” 越来越紧迫，于是，对任何一次自学的 “时间精力投资” 都缩手缩脚，小里小气……
>
> 预算观念非常重要 —— 这个观念的存在与否，成熟与否，基本上决定一个人未来的盈利能力。
>
> 大多数人对此不仅不成熟，甚至干脆没有预算观念！ —— 这也是为什么绝大多数人不适合创业的最根本原因。
>
> 不夸张地讲，未来的你只需要恪守一个原则，就很可能会因此超越 99% 的人：
>
> 绝对不做预算不够的事情。

找个时间做个每周的计划安排，然后再慢慢的给自己做个整体的规划，逐渐发现还是得有个计划安排才好，不然很多事可能都手忙脚乱了。

### [刻意练习](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.2.B.deliberate-practicing.ipynb)

> 你需要刻意练习的地方，需要你自己去刻意思考 —— 你和别人不一样，没有人和你一样，就这样。

### [为什么从函数开始？](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.2.C.why-start-from-writing-functions.ipynb)

> Python 的代码是开源的，它的代码仓库在 Github 上：
>
> https://github.com/python/
>
> 在这个代码仓库中，有一个目录下，保存着若干 Python Demo 程序：
>
> https://github.com/python/cpython/tree/master/Tools/demo

> 另外，从现代编程方法论来看，“写作” 部分一上来就从函数入手也的确是 “更正确” 的，因为结构化编程的核心就是拆分任务，把任务拆分到不能再拆分为止 —— 什么时候不能再拆分了呢？就是当一个函数只完成一个功能的时候……

### D.函数

#### [关于参数（上）](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.2.D.1-args.ipynb)

> 关于更多为函数、变量取名所需要的注意事项，请参阅：
>
> - [PEP 8 -- Style Guide for Python Code: Naming Conventions](https://www.python.org/dev/peps/pep-0008/#naming-conventions)
> - [PEP 526 -- Syntax for Variable Annotations](https://www.python.org/dev/peps/pep-0526/)
>
> 注：PEPs，是 Python Enhancement Proposals 的缩写：https://www.python.org/dev/peps/

判断闰年的函数

```python
# cpython/Lib/datetime.py
def _is_leap(year):
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)
_is_leap(300)
```

闰年分两种情况讨论：

- 能被 4 整除切不能被 100 整除的是闰年
- 能被 4 整除同时又能被 100 整除的，再判断如果能被 400 整除则是闰年

```python
def increase_one(n):
    n += 1
    return n

n = 1
print(increase_one(n))
# print(n)
```

> 当外部调用一个函数的时候，准确地讲，传递的不是变量，而是那个变量的值。

> 有一种情况要格外注意 —— 在函数内部处理被传递进来的值是可变容器（比如，列表）的时候，传入的值会被改变，所以一个好的习惯应该是在函数内部创建它的拷贝。

#### [关于参数（下）](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.2.D.2-aargs.ipynb)

> Order of Arguments
>
> 1. Positional
> 2. Arbitrary Positional
> 3. Keyword
> 4. Arbitrary Keyword

#### [化名与匿名](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.2.D.3-lambda.ipynb)

> 在 Python 中，我们可以给一个函数取个化名（alias）。

比起化名，我更喜欢称为别名。

#### [递归函数](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.2.D.4-recursion.ipynb)

```python
not random.randrange(0,10) # 1/10 probability to be dead
```

第一时间是真没反应过来，测试之后才发现是利用了非 0 数值转换为布尔类型为 True ，所以从 0 到 9 的十个数中取 not 后只有 0 为 True ， 有点秀的操作。

> 普林斯顿大学的一个网页，有很多递归的例子
>
> https://introcs.cs.princeton.edu/java/23recursion/

#### [函数的文档](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.2.D.5-docstrings.ipynb)

> 你在调用函数的时候，你像是函数这个产品的用户。
>
> 而你写一个函数，像是做一个产品，这个产品将来可能会被很多用户使用 —— 包括你自己。

产品说明书。看来不只是单纯写个注释那么简单了。

> Python [PEP 257](https://www.python.org/dev/peps/pep-0257/) 关于 Docstring 的规范。
>
> 简要总结一下 PEP 257 中必须掌握的规范：
>
> 1. 无论是单行还是多行的 Docstring，一概使用三个双引号扩起；
> 2. 在 Docstring 内部，文字开始之前，以及文字结束之后，都不要有空行；
> 3. 多行 Docstring，第一行是概要，随后空一行，再写其它部分；
> 4. 完善的 Docstring，应该概括清楚以下内容：参数、返回值、可能触发的错误类型、可能的副作用，以及函数的使用限制等等；
> 5. 每个参数的说明都使用单独的一行……

> **Docstring** 是**写给人看的**，所以，在复杂代码的 **Docstring** 中，写 **Why** 要远比写 **What** 更重要 —— 你先记住这点，以后的体会自然会不断加深。

怎么写好注释也是个技术活啊。

#### [保存到文件的函数](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.2.D.6-modules.ipynb)

> 模块文件系统目录检索顺序
>
> - 先去看看内建模块里有没有你所指定的名称；
> - 如果没有，那么就按照 sys.path 所返回的目录列表顺序去找。
>
> 你可以通过以下代码查看你自己当前机器的 sys.path：
>
> ```python
> import sys
> sys.path
> ```
>
> **在 sys.path 所返回的目录列表中，你当前的工作目录排在第一位。**
>
> 有时，你需要指定检索目录，因为你知道你要用的模块文件在什么位置，那么可以用 sys.path.append() 添加一个搜索位置：
>
> ```python
> import sys
> sys.path.append("/My/Path/To/Module/Directory")
> import my_module
> ```

这么说来，一直模糊不清的模块导入好像清晰了很多。特别是**当前工作目录排在 sys.path 的首位**。想起来之前想把 Scrapy 引入 Django 之中那是一顿折腾啊，记得也是通过添加工作目录实现的。

dir() - 查看可使用的变量名和函数名

### [测试驱动的开发](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.2.D.7-tdd.ipynb)\*\*

> 第一步，跟很多人想象得不一样，第一步不是上来就开始写……
>
> 第一步是先假定这个函数写完了，我们需要验证它返回的结果对不对……
>
> 这种 “通过先想办法验证结果而后从结果倒推” 的开发方式，是一种很有效的方法论，叫做 “Test Driven Development”，以测试为驱动的开发。

异常处理

> 在写程序的过程中，为别人（和将来的自己）写注释、写 Docstring；在写程序的过程中，为了保障程序的结果全面正确而写测试，或者干脆在最初写的时候就考虑到各种意外所以使用试错语句块 —— 这些明明是天经地义的事情，却是绝大多数人不做的…… 因为感觉有点麻烦。

### [可执行的 Python 文件](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.2.D.8-main.ipynb)

Python 的操作符优先级，完整表格在这里：

> [Operator precedence](https://docs.python.org/3/reference/expressions.html#operator-precedence)

Python 的更多彩蛋：

> [Python Easter Eggs](https://github.com/OrkoHunter/python-easter-eggs)

### [刻意思考](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.2.E.deliberate-thinking.ipynb)

> **这东西能用在哪儿呢？**

Google best applications of python skill

[What exactly can you do with Python?](https://medium.freecodecamp.org/what-can-you-do-with-python-the-3-main-applications-518db9a68a78)

> 这东西**还**能用在哪儿呢？

> 学编程真的很有意思，因为这个领域是世界上最聪明的人群之一开辟出来并不断共同努力着发展的，所以，在这个世界里有很多思考方式，琢磨方式，甚至可以干脆称为 “做事哲学” 的东西，可以普遍应用在其它领域，甚至其它任何领域。

我也是这么想的！（怎么感觉像是发了语音）

> [MoSCoW Method](https://en.wikipedia.org/wiki/MoSCoW_method)

简单说，就是，凡事都可以分为：

- Must have
- Should have
- Could have
- Won't have

贴标签一时爽，一直贴一直爽。

---
title: 《自学是门手艺》 读书笔记（3）
date: '2019-04-13 08:41:38'
tags: [读书笔记, 自学是门手艺]
draft: false
summary: 战胜难点
layout: PostSimple
---

## 第三部分

### [战胜难点](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.3.A.conquering-difficulties.ipynb)

> 无论学什么，都有难点。所谓的 “学习曲线陡峭”，无非就是难点靠前、难点很多、难点貌似很难而已。

React 应该算是学习曲线逐渐变得陡峭的，毕竟随便了解一下就能写了。但是要想熟练运用，这就不是个简单的事儿了。

> - 类，以及面向对象编程（Class，OOP）
> - 迭代器、生成器、装饰器（Iterators、Generators、Decorators）
> - 正则表达式（Regular Expressions）
> - 巴科斯-诺尔范式（Backus Normal Form）
>
> 尤其是最后一个，巴科斯-诺尔范式，几乎所有的编程入门书籍都不会提到……

前三个都还有所理解，这最后一个范式好像听都没听过啊。

> [Eureka](https://en.wikipedia.org/wiki/Eureka_effect)

看到 wiki 中的 **Aha! moment** ，我想已经猜到是啥意思了。所以啊，适当放松也很重要。

> 自学者恰恰因为遇到的 “困难” 多，所以才有更多遇到 “Eureka” 的可能性，那种幸福，还真的难以表述，即便表述清楚了，身边的人也难以理解，因为自学者就是很少很少。

看来我的 Enreka 还是太少了。

> 开始 “自学” 的活动，本质上来看，和断奶其实是一回事。
>
> 能够**耐心**读完那么多在别人看来 “极度枯燥” 的资料，是自学者的擅长。可那在别人看来 “无以伦比” 的耐心，究竟是哪儿来的呢？如何造就的呢？没断奶的人想象不出来。其实也很简单，首先，平静地接受了它枯燥的本质；其次，就是经过多次实践已然明白，无论多枯燥，总能读完；无论多难，多读几遍总能读懂…… 于是，到最后，**只不过是习惯了而已**。

### 编程进阶

#### [类 —— 面向对象编程](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.3.B.1.classes-1.ipynb)

> 面向对象编程（[Object Oriented Programming, OOP](https://en.wikipedia.org/wiki/Object-oriented_programming)是一种编程的范式（Paradigm），或者说，是一种方法论（Methodology）—— 可以说这是个很伟大的方法论，在我看来，现代软件工程能做那么复杂的宏伟项目，基本上都得益于这个方法论的普及。

关于 OOP 的争议也挺有意思的啊。不过如果不用 OOP 这样的方法论的话，还有什么样的方法论呢？值得探究。

##### 基本术语

- 对象（Objects）
- 封装（Encapsulate）
- 界面（Interface）
- 抽象（Abstract）
- 属性（Attributes）
- 方法（Methods）
- 类（Class）
- 子类（Subclass）
- 继承（Inheritance）
- 实例（Instances）

文中提到的对象和类的理解不就是说对象不就是实例了吗？面向对象编程，就是操作这些实例嘛。

#### [类 —— Python 的实现](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.3.B.2.classes-2.ipynb)

> self 就是个变量，跟程序中其它变量的区别在于，它是一个系统默认可以识别的变量，用来指代将来用这个 Class 创建的 Instance。

#### [函数工具](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.3.B.3.decorator-iterator-generator.ipynb)

##### 迭代器（Iterator）

iter() ，把一个 “可迭代对象”（ Iterable ）转换成 “迭代器”（ Iterator ）的内建函数

##### 生成器（Generator）

yield

##### 装饰器（Decorator）

[Python Decorator Library](https://wiki.python.org/moin/PythonDecoratorLibrary)

#### [正则表达式](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.3.B.4.regex.ipynb)**\***

> 我们可以用书写特定的规则，用来在文本中捕获与规则一致的字符串，而后对其进行操作……

> 目前（2019）网上最方便的 Regex 测试器，是 [regex101.com](https://regex101.com/)

##### 本义字符

> 最基本的原子，就是本义字符，它们都是单个字符。
>
> 本义字符包括从 a 到 z，A 到 Z，0 到 9，还有 \_ —— 它们所代表的就是它们的字面值。
>
> 即，相当于，string.ascii*letters 和 string.digits 以及 *。

```python
import string
string.ascii_letters
# 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

string.digits
# '0123456789'
```

> 以下字符在 Regex 中都有特殊含义：
>
> \ + \* . ? - ^ $ | ( ) [ ] { } < >

在 wiki 关于[正则表达式](https://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)的说明中有看到 < 的作用，难道正向肯定预查是省略了 > ？

测试了并不是，所有这个问题有待研究了。

> 注意：^ 和 $ 在 Python 语言中被 \A 和 \Z 替代。

呃，有这种事？在 regex101 中测试之后，这句话应该说是也可以使用 \A 和 \Z 替代吧。

> 注意：中括号的 | 不被当作特殊符号，而是被当作 | 这个符号本身。在中括号中的圆括号，也被当作圆括号 () 本身，而无分组含义。

> 匹配并捕获/非捕获匹配
>
> https://docs.python.org/3/library/re.html

正则真是强大而有趣，这一节让我对正则有了更深的了解，真是对得起 Mini Language 的叫法。

> 正则表达式的图形化示意图：
>
> https://regexper.com/

#### [BNF 以及 EBNF](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.3.B.5.bnf-ebnf-pebnf.ipynb)

> Backus-Naur Form（BNF，巴科斯-诺尔范式）和 Extended Backus-Naur Form（EBNF）

> 一种语法描述的方法

#### [拆解](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.3.C.breaking-good-and-bad.ipynb)

理解问题，拆解问题。

#### [刚需幻觉](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.3.D.indispensable-illusion.ipynb)

> 在自学中，耽误人的幻觉很多。比如，时间幻觉。人们总觉得自己时间不够了，所以学东西的时候总是很急…… 可实际上，练成一门手艺，到够用的地步，一两年足够；到很好的地步，三五年足够 —— 至于极好么，那是一辈子的事。结果呢，很多人瞎着急，乱 “省时间”，学啥都不全面，练啥都不足数足量，一晃三五年就过去，然后又开始焦虑，换个手艺再学学再试试…… 然后循环焦虑。

哈哈，学了半年 React 我就来深圳找工作了，现在想想自己胆子真大。

> “刚需幻觉” 的根源在于：
>
> 你不会的东西，对你来说感觉上就不是刚需。

> 正则表达式（Regex）就是很好的例子。

> 对任何一项技能来说，**刚需是自学的结果**，而不是自学的原因。

#### [全面 —— 自学的境界](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.3.E.to-be-thorough.ipynb)

文中提到要掌握一门手艺，还得做到全面，所以对于任何一个问题，不能仅靠一篇文章，一本书，毕竟那也只是作者的角度。自己得多方查阅，归纳总结，这样对于同一个问题，也有了自己的一个角度。

> 把自学当作一门手艺，把所有的技能也都当作一门手艺，那就相对容易理解了：
>
> 全面，是掌握一门手艺的基本。

> 提高对所学知识技能的 “全面程度”，有个最狠的方法 —— 再次说出来不惊人，但实际效果惊到爆：
>
> > 教是最好的学习方法。

> 孔老夫子在《礼记・学记》里就 “曰” 过：
>
> > “学然后知不足，教然后知困。知不足，然后能自反也；知困，然后能自强也。故曰：教学相长也。”
>
> 到了孔子三十二代孙，孔颖达，解读《兑命》中所提 “学学半” 时，说到：
>
> > “学学半者，上学为教，下学者谓习也……”

教学相长，记得以前老师也说过，帮同学讲清楚问题，才能说明真正的弄懂这个问题。现在的我也更多的是一个下学者，当继续努力。

_注释：学学半，里面的第一个“学”念 xiao，第四声，教人是学习的一半。第一个“学”是教的意思。_

#### [自学者的社交](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.3.F.social-selfteaching.ipynb)

> 当我们看到另外一个人正在做什么的时候，镜像神经元会**尽力**给我们足够的刺激，让我们 “体验” 那个人的感受。

> 人与人之间有很大的差异，最大的差异来自于性格养成，大多数人会沦为表现型人格，只有少数人才会在不断调整中保持、呵护、进一步培养 “进取型” 人格。他们自然而然地更为乐观，更有耐心，更有承受力，更有战斗力，更能生产更能体验学习与进步的乐趣。与这样的人在一起，学习会更容易 —— 只因为镜像神经元会更容易地被正确激发。说清楚了，道理其实挺简单的。

这个解释就很科学了，看来得不断刺激下镜像神经元才行。

> 想要把一门手艺搞到真正 “精湛” 的地步，最有效的方法就是尽早进入 “造” 的阶段 —— 所谓的 “造”，就是不断创造的 “造”。

> 硅谷有一家著名的孵化器，叫 Y-Combinator，现在的掌门人是个很年轻的人，Samuel H. Altman。他在那篇著名的文章《Advice for ambitious 19 year olds》中有一个精彩的建议：
>
> > No matter what you choose, build stuff and be around smart people.
> >
> > 无论你选择了什么，都要造出东西来，要与聪明人打交道。

> 我个人最看重的个人品质之一，就是**有没有像样的作品**。

> Github 能成为地球上最大的有效社交网络，没毛病，因为**用作品社交肯定是最高效的**。

我一直这么认为，要学习就得有产出，从归纳总结一篇文章到兴趣使然的一个作品都是难能可贵的。再者没有物质上的产出，也极容易遗忘，学完就丢了多可惜啊？没有作品，那学习更多的只是纸上谈兵，所有，要有作品，即使它不够完美。

从毕业以来虽然有学习很多东西，但大都没有悉心记录，归纳总结，很是懊悔。所以近段时间研究了一下怎么搭建博客站，呕心沥血，终于完成了这个目标。这也让我有了更足的动力去学习，去总结。

> 所以，无论学什么，都要想尽一切办法尽快做出自己的作品。做一个产品出来的过程中，会磨练另外一项自学者不可或缺的能力和素质：
>
> > **完整**
>
> 与之前提到的另外一项加起来，就构成了自学者的最基本素养：
>
> - 学就学得全面；
> - 做就做得完整。

> 无论多小的作品，都会让创作者感受到 “单一技能的必然无效性” —— 你试试就知道了。哪怕你想做个静态网站，你都会发现，仅仅学会 html/css 是不够的，因为部署到远端服务器上的时候，你无论如何都得学学 Linux 基本操作…… 而已然具备了自学者基本素养的你，自然会想办法 “全面掌握”，而不是糊弄一下而已。

> 顺带给你看个 Wikipedia 上的链接列表，在编程领域里，有无数可以借鉴到生活中的哲学、方法论：
>
> - [If it ain't broke, don't fix it](https://en.wikipedia.org/wiki/If_it_ain%27t_broke,_don%27t_fix_it)
> - [KISS principle](https://en.wikipedia.org/wiki/KISS_principle)
> - [Don't repeat yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
> - [Feature creep](https://en.wikipedia.org/wiki/Feature_creep)
> - [List of software development philosophies](https://en.wikipedia.org/wiki/List_of_software_development_philosophies)
> - [Minimum viable product](https://en.wikipedia.org/wiki/Minimum_viable_product)
> - [MoSCoW method](https://en.wikipedia.org/wiki/MoSCoW_method)
> - [Overengineering](https://en.wikipedia.org/wiki/Overengineering)
> - [Worse is better](https://en.wikipedia.org/wiki/Worse_is_better)
> - [S.O.L.I.D.](https://en.wikipedia.org/wiki/SOLID)
> - [Unix philosophy](https://en.wikipedia.org/wiki/Unix_philosophy)

> 给自己足够长的时间去学；在充足 “预算” 之下耐心地练；不断找活干，以用代练；然后，最重要的是，一定要尽快尝试着做出属于自己的完整作品，无论大小。
>
> 只有这样，你才是个值得被交往的人。

#### [这是自学者的黄金时代](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.3.G.the-golden-age-and-google.ipynb)

> 今天，自学者在真正的意义上身处于一个黄金时代 —— **没有什么是不能自学的**。

[20 Google Search Tips to Use Google More Efficiently](https://www.lifehack.org/articles/technology/20-tips-use-google-search-efficiently.html)

[挤挤都会有的 - 写给女生的性高潮指南](https://github.com/xiaolai/ji)

> Google Search 的官方文档在这里：
>
> https://support.google.com/websearch
>
> Google 还有更为强大的工具给你使用，叫做 Google Custom Search，官方文档在这里：
>
> https://support.google.com/customsearch/

[How To Ask Questions The Smart Way](https://github.com/selfteaching/How-To-Ask-Questions-The-Smart-Way)

#### [避免注意力漂移](https://github.com/selfteaching/the-craft-of-selfteaching/blob/master/Part.3.H.prevent-focus-drifting.ipynb)

> 注意力漂移，是我杜撰的一个词，用来作为 “注意力集中” 的反义词 —— 因为更多的时候，我们并不是 “注意力不集中”，而是…… 而是更令人恼火的一个现象：
>
> “注意力所集中的焦点总是不断被自己偷偷换掉……”

> **把 “全面完整” 放到最高优先级。**

的确，展开得越广，进展就越慢，就越不容易得到一个正向反馈循序渐进的做好一件事。比如之前的一家公司里，上班用 Java ，下班兼职搞 React ，抽空还得用 Python 整个 QQ 机器人。结果虽然都有些许进展，但实在是太低效了。

如今，转行做了 React 开发，Python 也暂时搁置了，在前端 React 上的进步是可喜的，接下来就是扩展到整个 Node.js 的生态了，努力做到全面完整。等到对于 Node.js 有了一定的发言权再好好学习 Python 吧，毕竟现在发现 Node.js 也很有趣。

---
title: React 开发心得
date: '2019-07-03 09:53:24'
tags: [学习笔记, React]
draft: false
summary: 接触 React 也有一年多了，觉得 React 挺有趣的。说个题外话，偶尔有看过 Vue 的一些代码，只能说习惯了 React 的思路， 看着 Vue 有点奇怪 😂，当然有机会还是可以学习一下 Vue 的。言归正传，前段时间突然有个需求需要将现有的一个 Modal 中的页面形成一个独立的页面，这让我发现了自己设计的弊端。所以想着得有个文章记录一下自己平时的心得体会，以备查阅。
layout: PostSimple
---

## 前言

接触 React 也有一年多了，觉得 React 挺有趣的。说个题外话，偶尔有看过 Vue 的一些代码，只能说习惯了 React 的思路， 看着 Vue 有点奇怪 😂，当然有机会还是可以学习一下 Vue 的。言归正传，前段时间突然有个需求需要将现有的一个 Modal 中的页面形成一个独立的页面，这让我发现了自己设计的弊端。所以想着得有个文章记录一下自己平时的心得体会，以备查阅。

## 心得

### 容器与内容分离

就像上面我所谈到的设计弊端就是我将 Modal 以及 Modal 中的内容放到了一个组件之中，这就造成了容器与其承载的内容的高度耦合，当要复用内容时，才知道应该将内容剥离出来，让它作为一个独立的内容。这样，无论是使用什么容器都能切换自如， Awesome 。

举例：

如下的 `Something` 组件就是将 Modal 与内容耦合的。

```jsx
// 声明
function SomethingModal(props) {
  // ...
  return <Modal>// something</Modal>
}

// 调用
;<SomethingModal
  visible={visible}
  handleVisible={this.handleVisible}
  {...otherProps}
/>
```

调用的时候会传入像 `visible`， `handleVisible` 这样的属性与方法。

改造之后：

```jsx
// 声明
function Something(props) {
  // ...
  return (
    // something
  )
}

// 调用
const SomethingProps = {
  // ...
};

<Modal
  visible={visible}
  handleVisible={this.handleVisible}
>
  <Something {...SomethingProps} />
</Modal>

<Drawer
  visible={visible}
  handleVisible={this.handleVisible}
>
  <Something {...SomethingProps} />
</Drawer>
```

这样的话，结构也更清晰。不用再取像 `SomethingModal` 这样的名字，该是什么就是什么。当需要复用 `Something` 的时候引入即可，即便要调整，也只是改改样式做些兼容就好了。

另，如果需要同步 `Something` 中的数据状态，可通过 `onChange` 这样的函数同步数据即可。

### 合理的状态作用域

由于刚接触 [ant-design-pro](https://github.com/ant-design/ant-design-pro/) 时，学习并使用了 [dva](https://github.com/dvajs/dva)（还好自己简单了解了 redux 了，上手还算顺利），然后就把几乎所有的状态都当进去了，然后就遇到了数据同步的尴尬问题，特别是当一个页面需要弹出两个以上的弹窗时，还放到 dva 的时候，那是真的折腾得头皮发麻 \_(:3J∠)\_

于是乎，有了这个总结，**页面级别的数据放到 dva 里应该就够了**，不然会导致做状态同步的时候很混乱。

如果需要异步从 `props` 同步 `state` ，那么通过

```jsx
static getDerivedStateFromProps(props, state) {}
```

根据条件初始化 `state` 即可。

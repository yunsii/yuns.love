---
title: 基于 Ant Design Pro 2.3.1 页面标签化展示的研究与实现
date: '2019-07-06 09:38:55'
lastMod: '2019-09-06 22:50:16'
tags: [学习笔记, Ant Design Pro]
draft: false
summary: 由于项目需求，需要一个自带标签页功能的 Ant Design Pro 脚手架，所以重新克隆了仓库来实现该功能，快速在仓库中基于之前的实践实现了该功能，随后发现了一个比较严重的问题。
layout: PostSimple
---

**如果暂时不关心实现可直接克隆该仓库 [ant-design-pro-plus](https://github.com/yunsii/ant-design-pro-plus)**

## 前言

之前有根据别人的实现做过一些研究（具体可见[[仅供参考]基于 Ant Design Pro 2.1.1 页面标签化展示的研究与实现](/blog/ant-design-pro-tabs-page)），其实现原理是根据注入到 `BasicLayout` 的 `menuData` 取得所有可用的页签组件 ，然后再根据点击事件来添加或者删除相关页签。

由于项目需求，需要一个自带标签页功能的 Ant Design Pro （以下简称 pro） 脚手架，所以重新克隆了仓库来实现该功能，快速在仓库中基于之前的实践实现了该功能，随后发现了一个比较严重的问题：像分步表单和个人中心这两个页面是使用的子路由切换子组件，导致了无法切换的 bug 。通过路由切换子组件功能还是很重要的，虽然之前的项目没有使用这种方式。然后就陷入了沉思，应该怎么办呢？

苦思冥想一番后，突然灵光一闪， Pro 自带没有便签页功能，是通过传入 children 来渲染 `BasicLayout` 下的页面的，那岂不是可以通过判断传入的 `children` 来更新标签页。说干就干，一番操作之后，果不其然，理论还是行得通的，这样就保留了通过路由切换子组件的功能。

## 研究与实现

### src/pages/Authorized.js

由于之前的实践，需要判断一个用户的 `rootTabKey`，不同菜单权限的用户可能 `rootTabKey` 也不同 ，且用户不可删除该 tab 。所以将请求菜单的 action 提升到了这里，通过给 `BasicLayout` 注入 `rootTabKey` 实现。

最近发现登录页面使用了 `menu` 这个全局 model 来生成页面标题，所以如果在 `BasicLayout` 中请求菜单信息时会先获取到登录的相关路由配置，从而导致标签页异常。又因为菜单可能会涉及用户权限，所以将该请求移到了 `Authorized` 中是有必要的。

### ChildrenTabs 组件

基于 `Tabs` 组件封装而成，可根据传入的 `activeKey` ， `activetTitle` ， `children` 实现 `children` 的标签化。

#### 核心代码

```jsx
export interface ChildrenTab {
  /** tab's title */
  tab: string;
  key: string;
  content: React.ReactChildren | JSX.Element;
  /** used to indicate the tab need refresh */
  refresh?: boolean;
  /** used to extends tab's properties */
  [k: string]: any;
}

function addTab(newTab: ChildrenTab, activedTabs: ChildrenTab[]) {
  /**
   * filter 过滤路由 为 '/' 的 children
   * map 添加第一个 tab 不可删除
   */
  return [...activedTabs, newTab]
    .filter(item => item.path !== '/')
    .map((item, index) =>
      activedTabs.length === 0 && index === 0
        ? { ...item, closable: false }
        : { ...item, closable: true }
    );
}

function switchAndUpdateTab(
  activeIndex: number,
  tabName: string,
  extraTabProperties: any,
  children: any,
  activedTabs: ChildrenTab[]
) {
  const { path, content, refresh, ...rest } = activedTabs[activeIndex];
  activedTabs.splice(activeIndex, 1, {
    tab: tabName,
    content: refresh ? content : children,
    ...rest,
    ...extraTabProperties,
  });
  /** map 删除后的 activedTabs 长度为 1 时不可删除 */
  return activedTabs.map(item => (activedTabs.length === 1 ? { ...item, closable: false } : item));
}

export interface ChildrenTabsProps {
  activeKey: string;
  activeTitle: string;
  handleTabChange: (keyToSwitch: string, activedTabs: any[]) => void;
  extraTabProperties?: {};
  tabsConfig?: TabsProps;
  afterRemoveTab?: (removeKey: string, nextTabKey: string, activedTabs: ChildrenTab[]) => void;
  /** children is used to create tab, switch and update tab */
  children: React.ReactChildren;
}

interface ChildrenTabsState {
  activedTabs: ChildrenTab[];
  activeKey: string | null;
  nextTabKey: string | null;
}

// lifecycle
static getDerivedStateFromProps(props: ChildrenTabsProps, state: ChildrenTabsState) {
  const { children, activeKey, activeTitle, extraTabProperties } = props;
  const { activedTabs, nextTabKey } = state;
  // return state and set nextTabKey to `null` after delete tab
  if (nextTabKey) {
    return {
      activedTabs,
      activeKey: nextTabKey,
      nextTabKey: null,
    };
  }

  const activedTabIndex = _findIndex(activedTabs, { key: activeKey });
  // return state after switch or update tab
  if (activedTabIndex > -1) {
    return {
      activedTabs: switchAndUpdateTab(
        activedTabIndex,
        activeTitle,
        extraTabProperties,
        children,
        activedTabs
      ),
      activeKey,
    };
  }
  // return state to add tab
  const newTab = {
    tab: activeTitle,
    key: activeKey,
    content: children,
    ...extraTabProperties,
  };
  return {
    activedTabs: addTab(newTab, activedTabs),
    activeKey,
  };
}
```

实现添加 tab 的功能无疑是最简单的，但是需要注意过滤掉根路由且当添加第一个路由时，不可删除。删除功能重构了好几次，最后是通过在 `getDerivedStateFromProps` 中判断是否有删除 tab 的相邻 tab key ，即 `nextTabKey` 实现。如果存在，直接设置 `activeKey` 为 `nextTabKey` ，并还原 `nextTabKey` 为 `null` 。**切换并更新**的功能可能涉及页面子路由，所以统一更新 tab 组件。

### PageTabs 组件

决定系统页签的展示方式。

首先如果是系统根路由 `proRootPath` （默认 `'/'`），传入的 `children` 会重定向到新页面，所以需要直接返回 `children` 组件。如果不返回 `children` 的话，会导致重定向失败，页面空白异常。

其次，由于系统使用的 `menuData` 是经过过滤的，像一些隐藏的页面也是需要页签展示的，所以需要保存并使用 `menu model` 中的 `originalMenuData` 来获取页签的 `id` 和 `name` 。

#### 核心代码

```jsx
// result: [pathID, pathName]
function getMetadataOfTab(
  childrenPathname: string,
  originalMenuData: MenuItem[],
): [string, string] {
  function getMetadata(
    path: string,
    menuData: MenuItem[],
    parent: MenuItem | null,
  ) {
    let result: [string, string]
    menuData.forEach((item) => {
      /** match prefix iteratively */
      if (pathToRegexp(`${item.path}(.*)`).test(path)) {
        if (!parent && item.name) {
          result = [item.path, item.name]
        } else if (parent && !parent.component && item.component && item.name) {
          /** create new tab if item has name and item's parant route has not component */
          result = [item.path, item.name]
        }
        /** get children pathID, pathName, shouldUpdate recursively */
        if (item.children) {
          result = getMetadata(path, item.children, item) || result
        }
      }
    })
    return result
  }
  return (
    getMetadata(childrenPathname, originalMenuData, null) || ['404', 'Error']
  )
}
```

由于使用了页面路径作为页签的 `tab id` ，所以页签的展示完全是由 `tab id` 决定的。

### src/layouts/BasicLayout.js

#### 核心代码

```jsx
const renderMenuData = transferMenuData(menuLoading, menuData)
const renderContent = () => {
  if (pageTabs) {
    if (renderMenuData) {
      return <PageTabs {...this.props} />
    }
    return <PageLoading />
  }
  return children
}
```

`renderMenuData` ： 根据 `menuLoading` ， `menuData` 判断是否需要展示的菜单数据（由于用户登录相关页面也会修改 `menuData` ）。<br /> `renderContent` ： 根据 `pageTabs` 和 `renderMenuData` 渲染页面。

**得益于采用了路由控制的方式，所以不需要像之前的方案一样向 SiderMenu 和 Header 传入点击处理事件。标签页的功能都在 `BasicLayout` 中实现，新增标签页通过路由切换的方式即可。**

## 注意事项

1. 由于使用了标签页的方式布局，所以还需要修改 `PageHeaderWrapper component` 根节点的 `style` 属性。
2. 性能问题，标签页切换可能导致已打开的标签页的重复渲染，可使用高级组件 `withRoutePage` （`import { withRoutePage } from '@/utils/enhanceUtils'`） 对页面做性能优化。

## 后记

### 为什么不用 v4 ？

在实现该功能的时候， v4 已经正式推出了，本来也计划直接用 v4 的，奈何 `npm run fetch:blocks` 安装所有区块总是失败，加之也已经比较熟悉 v2 了，所以依然选择了 v2 。

### 已知 v2 和 v4 的不同

像分步表单这种通过路由控制表单进度的方式，按理说应该做到如果没有执行前一步需要重定向到第一步。发现了 v4 是通过 dva 的状态判断表单进度的，所以根本不会改变路由。v2 由于没有使用区块的方式，分步表单可以灵活的使用路由切换，但是没有做进度的重定向，所以这构成了在两个版本在行为上的不同。为什么说这个呢？大概是当时眼花了，看到 v2 切换进度时路由并没有变化，还以为有什么改变路由不改变 location 的黑科技呢 \_(:3J∠)\_

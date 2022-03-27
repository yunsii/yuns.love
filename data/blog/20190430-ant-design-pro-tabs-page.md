---
title: '[仅供参考]基于 Ant Design Pro 2.1.1 页面标签化展示的研究与实现'
date: '2019-04-30 08:30:19'
lastMod: '2019-05-27 08:30:56'
tags: [学习笔记, Ant Design Pro]
draft: false
summary: 在官方仓库下的 issues 中有看到很多关于页面标签化展示的讨论，也有很多实现方式，比如在能否提供tab切换模式这个 issue 下就展开了一系列讨论，官方也给了很多例子甚至换脚手架……
layout: PostSimple
---

## 升级

最新方案可参考[基于 Ant Design Pro 2.3.1 页面标签化展示的研究与实现](/blog/ant-design-pro-tabs-page-by-route)

已知该方案缺陷：**不可在页面组件中正常使用路由切换子组件。**

## 前言

在[官方仓库](https://github.com/ant-design/ant-design-pro)下的 issues 中有看到很多关于页面标签化展示的讨论，也有很多实现方式，比如在[能否提供 tab 切换模式](https://github.com/ant-design/ant-design-pro/issues/220)这个 issue 下就展开了一系列讨论，官方也给了很多例子甚至换脚手架……

研究了几个例子后发现都没有在现有基础上的升级指南，都是一整个仓库……这就有些难受了。没办法了，自己动手吧。看了几个实现效果后选定了 [kuhami/react-ant](https://github.com/kuhami/react-ant) 这个仓库。

刚开始根据该仓库提供的[文档](https://kuhami.github.io/KroInterview/antTabs.html#/AntTabs)做了些改动，未果。由于该仓库没有 live demo ，使用 Gitpod 看了看实际效果发现还不错，所以对 `layouts/BasicLayout.js` 展开了深入研究。

## 研究与实现

通过学习，了解了他的实现方式，并在此基础上进行了部分优化，得到以下的方案。

### 工具方法

```jsx
export function transferMenuTreeToList(
  treeData,
  childrenNodeName = 'children',
) {
  const treeList = []
  function getTreeList(item) {
    item.forEach((node) => {
      treeList.push({
        tab: node.name,
        key: node.path,
        locale: node.locale,
        closable: true,
        content: node.component,
      })
      if (node[childrenNodeName] && node[childrenNodeName].length > 0) {
        getTreeList(node[childrenNodeName])
      }
    })
  }
  getTreeList(treeData)
  return treeList
}
```

### BasicLayout.js

#### 导入模块

```jsx
import { Layout, Tabs, Dropdown, Menu, Icon, Spin } from 'antd'
import router from 'umi/router'
import _find from 'lodash/find'
import _findIndex from 'lodash/findIndex'
import { transferTreeToList } from '@/utils/utils' // 引入工具函数
```

#### 声明常量

```jsx
const { TabPane } = Tabs

// tabs 菜单选项 key 值
const closeCurrentTabMenuKey = 'closeCurrent'
const closeOthersTabMenuKey = 'closeOthers'
const closeAllTabMenuKey = 'closeAll'

const rootTabKey = '/device/manage'
```

#### 添加 BasicLayout 初始化方法

```jsx
constructor(props) {
  super(props);
  this.state = {
    useableTabs: [],
    activedTabs: [],
    activeKey: null,
  };
}
```

#### 添加 componentWillReceiveProps 生命周期方法

用于在更新了 menuData 之后初始化 tabs 相关数据。

```jsx
componentWillReceiveProps(nextProps) {
  const { menuData } = this.props;
  if (nextProps.menuData !== menuData) {
    const { menuData: nextMenuData } = nextProps;
    const useableTabs = transferMenuTreeToList(nextMenuData);
    if (showPageTabs) router.push(rootTabKey);
    this.setState({
      activedTabs: useableTabs.filter(item => item.key === rootTabKey),
      activeKey: rootTabKey,
      useableTabs,
    });
  }
}
```

#### 添加点击设置 tabs 状态的方法

```jsx
handleActiveTabClick = (event) => {
  const { key } = event
  const { useableTabs, activedTabs } = this.state

  router.push(key)
  if (!_find(activedTabs, { key })) {
    this.setState({
      activedTabs: [...activedTabs, _find(useableTabs, { key })],
    })
  }
  this.setState({ activeKey: key })
}
```

#### 添加 tabs 操作处理方法

```jsx
handleTabChange = (key) => {
  this.setState({ activeKey: key })
  router.push(key)
}

onEdit = (targetKey, action) => {
  this[action](targetKey)
}

remove = (targetKey) => {
  const { activedTabs } = this.state
  if (targetKey === rootTabKey) return
  this.setState({
    activedTabs: activedTabs.filter((item) => item.key !== targetKey),
    activeKey: activedTabs[_findIndex(activedTabs, { key: targetKey }) - 1].key,
  })
}

handleTabsMenuClick = (event) => {
  const { key } = event
  const { activeKey, activedTabs } = this.state

  if (key === closeCurrentTabMenuKey) {
    this.remove(activeKey)
  } else if (key === closeOthersTabMenuKey) {
    this.setState({
      activedTabs: activedTabs.filter(
        (item) => item.key === activeKey || item.key === rootTabKey,
      ),
      activeKey,
    })
  } else if (key === closeAllTabMenuKey) {
    this.setState({
      activedTabs: activedTabs.filter((item) => item.key === rootTabKey),
      activeKey: rootTabKey,
    })
  }
}
```

#### 更新 render() 方法

```jsx
const {
  navTheme,
  menuData,
  breadcrumbNameMap,
  fixedHeader,

  // 添加以下两个变量
  showPageTabs,
  loading,
} = this.props;

const { activedTabs, activeKey } = this.state;

const menu = (
  <Menu onClick={this.handleTabsMenuClick}>
    <Menu.Item key={closeCurrentTabMenuKey}>关闭当前标签页</Menu.Item>
    <Menu.Item key={closeOthersTabMenuKey}>关闭其他标签页</Menu.Item>
    <Menu.Item key={closeAllTabMenuKey}>关闭全部标签页</Menu.Item>
  </Menu>
);
const operations = (
  <Dropdown overlay={menu}>
    <a className={styles.antDropdownLink} href="#">
      标签操作&nbsp;
      <Icon type="down" />
    </a>
  </Dropdown>
);
const showTabsOrNot =
  showPageTabs && activedTabs && activedTabs.length
    ? (
      <Tabs
        // className={styles.tabs}
        activeKey={activeKey}
        // animated
        onChange={this.handleTabChange}
        tabBarExtraContent={operations}
        tabBarStyle={{ margin: 0 }}
        tabPosition="top"
        tabBarGutter={-1}
        hideAdd
        type="editable-card"
        onEdit={this.onEdit}
      >
        {activedTabs.map(item => {
          return (
            <TabPane tab={item.tab} key={item.key} closable={item.key !== rootTabKey}>
              {/* <Route key={item.key} path={item.path} component={item.content} exact={item.exact} /> */}
              <item.content />
              {/* {children} */}
            </TabPane>
          );
        })}
      </Tabs>
    )
    : children;

<SiderMenu
  logo={logo}
  theme={navTheme}
  onCollapse={this.handleMenuCollapse}
  menuData={menuData}
  isMobile={isMobile}
  {...this.props}

  // 添加侧边菜单点击处理事件
  handleActiveTabClick={this.handleActiveTabClick}
/>

<Header
  menuData={menuData}
  handleMenuCollapse={this.handleMenuCollapse}
  logo={logo}
  isMobile={isMobile}
  {...this.props}

  // 添加 Header 点击处理事件
  handleActiveTabClick={this.handleActiveTabClick}
/>

<Content className={styles.content} style={contentStyle}>
  {showTabsOrNot}
</Content>

// Spin 组件包裹 ContainerQuery
<Spin spinning={loading}>
  <ContainerQuery query={query}>
    // ...
  </ContainerQuery>
</Spin>

// 添加 loading
export default connect(({ global, setting, menu: menuModel, loading }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
  loading: loading.effects['menu/getMenuData'],
  ...setting,
}))(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
));
```

以上，完成了对 `BasicLayout.js` 改造。其中分别为 `SiderMenu` 和 `Header` 组件注入了点击处理方法。

在 `components/SiderMenu/BaseMenu.js` 中添加 `onClick` 事件接收并绑定该事件方法。在 `layouts/Header.js` 的 `handleMenuClick` 方法中为除了 logout 的路由 `router.push('path')` 其后添加 `handleActiveTabClick({ key: 'path'})` 即可。

## 补充

### BasicLayout.less

```less
.antDropdownLink {
  margin-right: 8px;
}
```

### showPageTabs

- showPageTabs 在 defaultSetting.js 中配置即可。

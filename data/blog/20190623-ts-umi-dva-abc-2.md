---
title: TypeScript + React + Umi + Dva 开发入门之问题总结
date: '2019-6-23 22:13:35'
tags: [学习笔记, TypeScript, React]
draft: false
summary: 总结开发过程中的各种坑 _(:3J∠)_
layout: PostSimple
---

总结开发过程中的各种坑 \_(:3J∠)\_

## 官方插件

### 国际化

#### 特殊情况下， formatMessage id 验证失败

```ts
import { formatMessage, MessageDescriptor } from 'umi-plugin-locale'

{
  orderItems.map((item) => (
    <Select.Option key={item} value={item}>
      {formatMessage({
        id: `home.${item.toLowerCase()}` as MessageDescriptor['id'],
      })}
    </Select.Option>
  ))
}
```

引入接口 `MessageDescriptor` ，在验证失败处，使用 as 语法 `as MessageDescriptor['id']` ，不能使用 `as MessageDescriptor.id` ，提示仅有 **namespace** 能使用该语法。

备注：

- [Any difference between type assertions and the newer \`as\` operator in TypeScript?](https://stackoverflow.com/questions/33503077/any-difference-between-type-assertions-and-the-newer-as-operator-in-typescript)

经过一周的学习，发现其实最简单暴力的办法应该是 `as any` 。

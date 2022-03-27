---
title: Deepin 个人开发环境搭建
date: '2020-03-14 18:25:06'
tags: [学习笔记, Deepin]
draft: false
summary: 由于使用 Windows 总是感觉到卡顿，在之前买的 Intel NUC 上使用，每天下班之前都能在 VS Code 关闭后感到整个电脑就突然就卡住了，让人很是烦躁。又想着自己已经没有太大的欲望玩 PC 游戏了，遂决定第三次装 Deepin 来试试，看能否作为主力系统来使用。经过一周的折腾，发现还是能堪大任的。
layout: PostSimple
---

## 起因

由于使用 Windows 总是感觉到卡顿，在之前买的 Intel NUC 上使用，每天下班之前都能在 VS Code 关闭后感到整个电脑就突然就卡住了，让人很是烦躁。又想着自己已经没有太大的欲望玩 PC 游戏了，遂决定第三次装 Deepin 来试试，看能否作为主力系统来使用。经过一周的折腾，发现还是能堪大任的。

现在总结一下自己使用 Deepin 搭建个人开发环境的经验和教训。

## 系统安装

官方已经提供了很傻瓜式的安装方式了。

- 从[官网](https://www.deepin.org/)下载**系统镜像**和**启动盘制作工具**
- 使用优盘制作好 Deepin 启动盘
- 进入 BIOS 从启动盘启动电脑，根据提示安装系统（注意磁盘分区）
- 移除启动盘重启即可（注意引导问题，我在 NUC 上安装时，由于使用的 UEFI 引导会导致开机找不到系统，进入 BIOS 切换为 Legacy 引导即可）

## 环境搭建

通过在 NUC 和 MateBook X Pro 上实装，并结合目前的开发需求，总结如下：

### 系统配置

#### 终端路径联想忽略大小写

[参考链接](https://blog.csdn.net/qq_34369618/article/details/77751045)

- 用户根目录下创建 `.inputrc`
- 写入 `set completion-ignore-case on`
- 重启终端即可

#### TIM 不能加载图片

[解决方案](https://bbs.deepin.org/forum.php?mod=viewthread&tid=188959)

> 可以通过 grub 来关闭 ipv6:<br /> sudo vim /etc/default/grub<br /> GRUB_CMDLINE_LINUX_DEFAULT="quiet spalsh"<br /> GRUB_CMDLINE_LINUX_DEFAULT="ipv6.disable=1 quiet splash"<br /> sudo update-grub<br /> 然后重启系统<br />

#### 为 AppImage 等创建快捷方式

[参考链接](https://blog.csdn.net/qq_37806908/article/details/98523270)

其中 `/usr/shars/applications/` 目录为启动器应用目录，`~/.config/autostart/` 目录为开机自启的应用目录。

### 软件配置

#### git

`sudo apt-get install git`

#### nodejs

[安装说明](https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions)

使用 `cnpm` -> `npm install -g cnpm --registry=https://registry.npm.taobao.org`

#### v2ray

[参考文档](https://www.wandouip.com/t5i197953/)

- [v2ray-core download](https://github.com/v2ray/v2ray-core/releases) 注意架构区别
- [Qv2ray download](https://github.com/Qv2ray/Qv2ray/releases)
- `wget https://install.direct/go.sh`
- `sudo bash go.sh --local ./v2ray-linux-64.zip`

> 使用 go.sh 安装完成后会在系统中自动安装以下组件：<br />
>
> /usr/bin/v2ray/v2ray：V2Ray 程序；<br /> /usr/bin/v2ray/v2ctl：V2Ray 工具；<br /> /etc/v2ray/config.json：配置文件；<br /> /usr/bin/v2ray/geoip.dat：IP 数据文件<br /> /usr/bin/v2ray/geosite.dat：域名数据文件<br />
>
> 此脚本会配置自动运行脚本。自动运行脚本会在系统重启之后，自动运行 V2Ray。目前自动运行脚本只支持带有 Systemd 的系统，以及 Debian / Ubuntu 全系列。<br />
>
> 运行脚本位于系统的以下位置：<br />
>
> /etc/systemd/system/v2ray.service: Systemd<br /> /etc/init.d/v2ray: SysV<br />
>
> 脚本运行完成后，你需要：<br />
>
> 编辑 /etc/v2ray/config.json 文件来配置你需要的代理方式；<br /> 运行 service v2ray start 来启动 V2Ray 进程；<br /> 之后可以使用 service v2ray start|stop|status|reload|restart|force-reload 控制 V2Ray 的运行。<br />

- 配置 v2ray 相关路径即可使用

#### copyq 剪贴板工具

[download](https://github.com/hluk/CopyQ/releases)

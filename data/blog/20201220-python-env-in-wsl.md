---
title: WSL 中的 Python 开发环境搭建
date: '2020-12-20 23:04:42'
tags: [学习笔记, Python]
draft: false
summary: 尝试了一下 TypeScript 之后，是“真香”啊，静态类型检验确实能避免很多编译时的问题。学有余力之际，所以打算先过一遍官方文档。本系列是以官方文档为主，结合自身相关经验整理而成的入门学习笔记。
layout: PostSimple
---

## 操作系统准备

首先需要选择合适的操作系统，我选择的是 Ubuntu 18.04 on WSL，首先需要[更换国内源](https://zhuanlan.zhihu.com/p/61228593)，避免下载过慢的问题:

### 备份源列表

```bash
sudo cp /etc/apt/sources.list /etc/apt/sources.list_backup
```

### 编辑源配置文件

```bash
sudo vim /etc/apt/sources.list
```

阿里源

```
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
```

### 刷新列表

```bash
sudo apt-get update
sudo apt-get upgrade
```

## 安装 Python

由于已安装了 Python 3.6，所以直接[升级到 Python 3.8](https://www.itsupportwale.com/blog/how-to-upgrade-to-python-3-7-on-ubuntu-18-10/)即可

### 安装新版 Python

```bash
sudo apt-get install python3.8
```

### 添加可选项

```bash
sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.6 1
sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.7 2
```

### 更改 python3 指向

```bash
sudo update-alternatives --config python3
```

选择合适的版本即可。

### 安装 pip

```bash
sudo apt install python3-pip
```

### 安装 venv

```bash
sudo apt install python3-venv
```

### [安装 pipenv](https://pipenv.pypa.io/en/latest/install/#installing-pipenv)

```bash
pip3 install --user pipenv
```

## 总结

尝试过在 VS Code 中进行 Python 开发，结合自身体验（一些方法不能正常跳转）并结合[一些讨论](https://zhuanlan.zhihu.com/p/66157046)得出一个初步的结论：VS Code 不适合 Python 开发。由于暂时没有更好的 Linux 环境（没有可视化桌面），故还是回到了 PyCharm on Windows 的开发环境。当然如果是 PyCharm on Linux 的话，直接装上 PyCharm 应该也没什么问题了。

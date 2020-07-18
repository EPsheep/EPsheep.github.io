---
layout:     post
title:      "in_array和array_key_exists效率比较"
subtitle:   ""
date:       2020-07-18 18:31:00
author:     "胡荣"
header-img: "https://s1.ax1x.com/2020/07/05/UpySlq.jpg"
tags:
  - PHP
---

## 比较 isset、array_key_exists、in_array 三者的效率

结果是 isset > array_key_exists > in_array

在有三万元素的情况下，in_array的处理速度是8秒。

如果是严格模式的in_array，时间减短为3秒多秒。

而isset和array_key_exists均为1秒左右。

## 分析

在 in_array 中, 进行的是循环对数组遍历, 因而其所费的时间要多

isset 和 array_key_exists 是将变量认为是Hash进行判断, 因而所费时间极短
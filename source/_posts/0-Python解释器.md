---
title: Python解释器
tags:
  - Python
  - 笔记
categories: python
cover: /images/python.jpg
date: 2022-04-23 14:46:36
---

# Python解释器

- CPython: 官方开发的 `Python` 解释器, 使用 `C语言` 开发

- IPython: 基于 `CPython` 解释器开发的, 在交互方式上有所增强(CPython用 `>>>` 作为提示符, 而IPython用 `In [序号]:` 作为提示符)

- PyPy: 采用 [JIT技术](http://en.wikipedia.org/wiki/Just-in-time_compilation), 对 `Python` 代码进行 `动态编译` (不是**解释**), 所以可以显著提高Python代码的执行速度

- Jython: 运行在 `Java` 平台上的Python解释器,可以直接把 `Python` 代码编译成 `Java` 字节码执行

- IronPython: 运行在微软 `.NET` 平台上的Python解释器, 可以直接把 `Python` 代码编译成 `.NET` 的字节码

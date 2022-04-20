---
title: Markdown语法总结
date: 2021-04-17 00:17:54
tags:
  - Markdown语法
  - typora
categories: Markdown
katex: true
cover: /images/markdown.png
---

> [Markdown](https://baike.baidu.com/item/markdown) 是一种轻量级标记语言，由 John Gruber 在2004年创造，其目的是希望大家使用“易于阅读、易于撰写的纯文字格式，并选择性的转换成有效的XHTML（或是HTML）”。 其中最重要的设计是可读性，也就是说这个语言应该要能直接在字面上的被阅读，而不用被一些格式化指令标记（像是RTF与HTML）。

## :book: ​文本效果 <a name="文本效果"></a>

在Markdown中我们只需要打下以下标记即可给文本添加各种效果

- `==文本==` 即可让 ==文本== 高亮
- `*文本*` 就是斜体 *文本* 
- `**文本**` 便可做到加粗 **文本**
- `***文本***` 两者结合便是斜体及加粗效果 ***文本***
- `文本1^文本2^` 便是在 `文本1` 上加上标 `文本2` 文本1^文本2^ 
- `文本1~文本2~` 类似加上标，我们也可以加下标  文本1~文本2~ 
- `~~文本~~` 就是删除线 ~~文本~~
- `:emoji:` 通过这个标记即可输入[emoji表情](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)，如 :smile:、:sweat:、:angry:、:dog:、:cat:……
- `<u>文本</u>` 可以给 <u>文本</u> 加下滑线[^1]
- `文本[^1]` 可以给文本加一个脚注，效果如上所示，脚注格式[^2]
- <code>`</code> 或 <code>``</code> 可以用来扩短代码，如： <code>npm install -g hexo-cli</code> 便是如此

## :black_square_button: ​块组件

同时我们还可以使用以下标记来实现一些更复杂的效果

- `#、##、...、######` 可用来表示一到六级标题

- `[toc]` 可以自动生成一个文章目录

- <code>```</code> 可以用来显示长代码块[^3]，如下所示：

  ```python
  import sys
  sys.exit()
  ```

- `> ` 可以用来显示引用块[^4]

  > A person who never made a mistake never tried anything new.
  >
  > ——Albert Einstein

- `| 文本1 | 文本2 |` 可以创建一个表格[^5]

  | 文本1 | 文本2 |
  | ----- | ----- |
  | 内容1 | 内容2 |
  
- `- [ ] ` 或 `- [x] ` 可以创建一个任务清单[^6]

  - [ ] 未完成任务
  
  - [x] 已完成任务

## :link: 链接及图片

- `![title](picture path | picture url)` 这种形式可以插入图片
  - `title` 指图片名称，在图片因未知原因未加载时显示
  - `(...)` 指图片的位置，可以是用本地图片的绝对路径或相对路径引用，或者用网络图片的<abbr title="统一资源定位器">URL</abbr>[^7]

![test_image](./Markdown语法总结/ACC.jpg)

- `[word](link url)` 、`[word][]` 、`[word][find]` 都可在文中生成行内链接，不同的在于后两种都需在之后定义指向的链接[^8] [word](https://www.example.com)   [word][]   [word][find]
  - `word` 为文中词句
  - `find` 为链接标识
  - `<link url>` 用于生成外部链接

## :key: 进阶操作

除了以上这些操作以外，由于Markdown主要用于:spider_web:博客的写作，或 :globe_with_meridians: GitHub等代码托管网站的README文件的书写，所以Markdown文件支持HTML标签、锚点设置，同时还支持遵循LaTex语法的数学公式的表示

- 常用的HTML标签

  - `<u>w</u>` <u>下滑线</u>设置
  - `<kbd>w</kbd>` 类键盘<kbd>按键</kbd>
  - `<abbr tiltle="description">w</abbr>` 缩写<abbr title="World Traffic Organization">WTO</abbr>
  - `<img src=url/>` 图片<img src="./Markdown语法总结/ACC.jpg"/>
  - `<video src=url/>` 视频

- LaTex数学公式

  - `$` 用于设置行内公式 $a+b=c$
  - `$$` 用于设置行间公式

$$
\begin{array}{c}

\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} & = \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\

\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\

\nabla \cdot \vec{\mathbf{B}} & = 0

\end{array}
$$

- `typora`[^9]的锚点设置本质上也是HTML标签的应用，在需要设置锚点的文本后加`<a name="标识"></a>` ，之后将需要跳转的文本设置链接。如将本文的第一块内容的标题 `文本效果` 设置锚点标识为 `“文本效果”` ，以下为链接的不同格式[^10]
- `[跳转](#标识)` [跳转](#文本效果)
  
- `[跳转][标识]` [跳转][标识]
  
- `[跳转][]` [跳转][]

[跳转]: #文本效果
[标识]: #文本效果
[word]: https://www.example.com
[find]: http://www.example.com

[^1]: 或用快捷键 <kbd>Ctrl</kbd> + <kbd>u</kbd> 来为文本加下划线
[^2]:  `[^ n] :`
[^3]: 格式如：<code>```语言\n + 代码</code>
[^4]: 注意 `>` 与文本之间有空格
[^5]: 也可以用快捷键 <kbd>Ctrl</kbd> + <kbd>t</kbd> 来实现
[^6]: 注意在 `-` 与 `[]` 之间以及 `[]` 之后有一个空格
[^7]: 将本地图片路径转换为网络图片路径可配置图床
[^8]: `[word]: description` (`[word][]`式)，`[find]: description`(`[word][find]`式)
[^9]: 可能不适用于其他Markdown编辑器
[^10]: 不能使用外部链接
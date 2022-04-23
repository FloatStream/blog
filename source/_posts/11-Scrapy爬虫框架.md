---
title: Scrapy爬虫框架
tags:
  - Python
  - 笔记
categories: python
cover: /images/python.jpg
date: 2022-04-23 14:46:41
---

# Scrapy 架构图

![架构图](11-Scrapy爬虫框架/8c591d54457bb033812a2b0364011e9c_articlex.png)

- **Scrapy Engine(引擎)**: 负责Spider、ItemPipeline、Downloader、Scheduler中间的通讯，信号、数据传递等。
- **Scheduler(调度器)**: 它负责接受引擎发送过来的Request请求，并按照一定的方式进行整理排列，入队，当引擎需要时，交还给引擎。
- **Downloader（下载器）**：负责下载Scrapy Engine(引擎)发送的所有Requests请求，并将其获取到的Responses交还给Scrapy Engine(引擎)，由引擎交给Spider来处理，
- **Spider（爬虫）**：它负责处理所有Responses,从中分析提取数据，获取Item字段需要的数据，并将需要跟进的URL提交给引擎，再次进入Scheduler(调度器).
- **Item Pipeline(管道)**：它负责处理Spider中获取到的Item，并进行进行后期处理（详细分析、过滤、存储等）的地方。
- **Downloader Middlewares（下载中间件）**：你可以当作是一个可以自定义扩展下载功能的组件。
- **Spider Middlewares（Spider中间件）**：你可以理解为是一个可以自定扩展和操作引擎和Spider中间通信的功能组件（比如进入Spider的Responses;和从Spider出去的Requests）

# 运行流程

1. **引擎**: 从 Spider 处获取需访问的网站域名
2. **Spider**: 提供网站域名
3. **引擎**: 从 Spider 处获取第一个URL
4. **Spider**: 提供第一个URL
5. **引擎**: 向 调度器 提供request
6. **调度器**: request 入队并整理
7. **引擎**: 从 调度器 处获得队首处理好的request并发送给 下载器 下载
8. **下载器**: 访问网页下载资源(如失败, 返回给引擎失败消息, 引擎会重新将该请求发送给 调度器 重新入队)
9. **引擎**: 接收经过 下载中间件 处理后的下载数据并发送给 Spider
10. **Spider**: 处理完数据后给 引擎 提供下一个URL和需进一步处理的Item数据
11. **引擎**: 将Item数据发送给管道调度器处理, 并将URL发送给调度器进行处理, 返回第六步开始循环

# 项目目录结构

```
mySpider/
	scrapy.cfg
	mySpider/
		__init__.py
		items.py
		pipelines.py
		settings.py
		middlewares.py
		spiders/
			__init__.py
			...
```

- **scrapy.cfg**: 项目的配置文件。
- **mySpider/**: 项目的Python模块，将会从这里引用代码。
- **mySpider/items.py**: 项目的目标文件。
- **mySpider/pipelines.py**: 项目的管道文件。
- **mySpider/settings.py**: 项目的设置文件。
- **mySpider/middlewares.py**: 项目的中间件文件。
- **mySpider/spiders/**: 存储爬虫代码目录。

# 项目流程

1. 新建项目(scrapy startproject ProjectName)

2. 明确处理目标(编写items.py [官方文档](https://docs.scrapy.org/en/latest/topics/items.html))

   - 在items.py文件中创建`scrapy.Item`类, 并定义类型为`scrapy.Field`的类属性来定义多个Item

     ```python
     import scrapy
     
     class ItcastItem(scrapy.Item):
         name = scrapy.Field()
         title = scrapy.Field()
         info = scrapy.Field()
     ```

3. 制作爬虫(编写spiders/xxxspider.py)

   - 在mySpider/spiders目录下生成爬虫, 并指定爬取的域

     ```python
     scrapy genspider itcast "itcast.cn"
     ```

   - 编辑生成的itcast.py

     ```python
     import scrapy
     class ItcastSpider(scrapy.Spider):
         name = 'itcast'
         allowed_domains = ['itcast.cn']
         start_urls = (
         	'http://www.itcast.cn/',
         )
         
         def parse(self, response):
             pass
     ```

     以上是使用指令自动生成的代码, 生成一个爬虫需要三个强制属性(`name`, `allowed_domains`, `start_urls`)和一个方法(`parse`)

     - `name`: 爬虫的识别名称，必须是唯一的，在不同的爬虫必须定义不同的名字
     - `allowed_domains`: 搜索的域名范围，也就是爬虫的约束区域，规定爬虫只爬取这个域名下的网页，不存在的URL会被忽略
     - `start_urls`: 爬取的URL元祖/列表。爬虫从这里开始抓取数据，所以，第一次下载的数据将会从这些urls开始。其他子URL将会从这些起始URL中继承性生成。
     - `parse(self, response)`: 解析的方法，每个初始URL完成下载后将被调用，调用的时候传入从每一个URL传回的Response对象来作为唯一参数，主要作用:负责解析返回的网页数据(response.body)，提取结构化数据(生成item); 生成需要下一页的URL请求

4. 存储内容(编写pipelines.py) 

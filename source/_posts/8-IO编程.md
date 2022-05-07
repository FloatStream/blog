---
title: IO编程
tags:
  - Python
  - 笔记
categories: python
cover: /images/python.jpg
date: 2022-04-23 14:46:53
---

# IO编程

由于CPU和内存的速度远远高于外设的速度，所以，在IO编程中，就存在速度严重不匹配的问题。此时有两种策略

1. CPU等着, 也就是程序赞同执行后续代码, 等数据写入磁盘后再向下执行, 这种模式称为**同步IO**
2. CPU不等待, 后续代码继续执行, 磁盘慢慢写入, 这种模式称为**异步IO**

## 文件读写

读写文件前，我们先必须了解一下，在磁盘上读写文件的功能都是由操作系统提供的，现代操作系统不允许普通的程序直接操作磁盘，所以，读写文件就是请求操作系统打开一个文件对象（通常称为文件描述符），然后，通过操作系统提供的接口从这个文件对象中读取数据（读文件），或者把数据写入这个文件对象（写文件）

### 文件对象操作

1. **基本语法**: `open(filename, 'mode')`

2. **完整语法**: `open(file, mode='r', buffering=-1, encoding=None, errors=None, neline=None, closefd=True, opener=None)`

3. **参数**: 

   `filename`--包含了需要访问的文件名称的字符串; 

   `mode`--打开文件的模式(详解下表); 

   `buffering`--设置缓冲;

   `encoding`--编码方式;

   `errors`--报错级别;

   `newline`--区分换行符;

   `closefd`--传入的**file**参数类型;

   `opener`--设置自定义开启器, 开启器的返回值必须是一个打开的文件描述符

|    模式    |  r   |  r+  |  w   |  w+  |  a   |  a+  |
| :-------- | :--: | :--: | :--: | :--: | :--: | :--: |
|     读     |  \+   |  \+   |      |  \+   |      |  \+   |
|     写     |      |  \+   |  \+   |  \+   |  \+   |  \+   |
|    创建    |      |      |  \+   |  \+   |  \+   |  \+   |
|    覆盖    |      |      |  \+   |  \+   |      |      |
| 指针在开始 |  \+   |  \+   |  \+   |  \+   |      |      |
| 指针在结尾 |      |      |      |      |  \+   |  \+   |

4. **文件对象的方法**

| 方法          | 参数                                                         | 描述                                                 |
| ------------- | :----------------------------------------------------------- | ---------------------------------------------------- |
| f.close()     |                                                              | 关闭文件                                             |
| f.flush()     |                                                              | 刷新文件内部缓冲, 直接把内部缓冲区的数据立刻写入文件 |
| f.write()     | \<string\> -- 写入的文本                                     | 将`string`写入到文件中, 并返回写入的字符数           |
| f.seek()      | \<offset\> -- 偏移量<br />\<from_what> -- 开始的地方(0-开头 1-当前 2-结尾) | 改变当前文件指针的位置                               |
| f.readline()  |                                                              | 读取单独的一行                                       |
| f.read()      | `size` -- 数据的字节长度                                     | 读取文件内容                                         |
| f.readlines() | `sizesint` -- 数据的字节长度                                 | 返回文件中包含的所有行(以列表形式)                   |
| f.tell()      |                                                              | 返回文件指针当前的位置, 从文件开头算起的字节数       |

5. **注**: 使用完一个文件后要记得关闭, 可以使用`with`语句自动完成这个过程

### file-like Object

由于Python”鸭子语言”的特性, 使得如果一个对象可以被`open()`函数返回且有`read()`方法, 则可以像一个文件一样处理, 这类对象统称为`file-like Object`; 例如: 内存的字节流, 网络流, 自定义流等等

`StringIO`就是在内存中创建的file-like Object, 常用作临时缓冲

## StringIO 和 BytesIO

### StringIO

`StringIO`顾名思义就是在内存中读写str; 要把str写入StringIO, 首先需要从`io`模块导入`StringIO`类并创建(可以在创建时传入一个str), 之后便可像文件对象一样操作; `getvalue()`方法用于获取写入后的str

**例**:

```python
>>> from io import StringIO
>>> f = StringIO()
>>> f.write('hello')
5
>>> print(f.getvalue())
hello
```

### BytesIO

如果要操作二进制数据, 就需要使用`BytesIO`

与`StringIO`类似, 从`io`模块中导入`BytesIO`类, 然后类似可以创建一个对象实现文件对象一般的操作, 只是需要注意的在写入时需要写入**二进制数据**

## 操作文件和目录

该内容主要使用了 `os` 模块, 可以作为{% post_link 4-模块详解 os模块 %}的详细介绍 

### 环境变量

在系统中定义的环境变量, 将保存 `os.environ` 中(这是一个字典对象), 可以像操作字典一样获取环境变量

### 操作文件和目录

操作文件和目录的函数一部分放在 `os` 模块中, 一部分放在 `os.path `模块中

```python
# 查看当前目录的绝对路径
>>> os.path.abspath('.')
# 在某个目录下创建一个新目录
>>> p = os.path.join('/Users/michael', 'testdir')  # 首先把新目录的完整路径表示出来(使用内置函数, 防止因为系统不同路径表示方法不同的错误)
>>> os.mkdir(p)  # 创建目录
>>> os.rmdir(p)  # 删除目录
```

与`os.path.join()`相同, 在拆分路径时, 不应该直接拆字符串, 而是通过`os.path.split()`函数拆分(结果为一个list, 第一个为父路径, 第二个为最后一级的文件或目录名); `os.path.splitext()`可以直接获得**文件扩展名**(结果为一个列表, 第一个为扩展名之前的字符, 第二个扩展名字符)

```python
# 对文件重命名
>>> os.rename('test.txt', 'test.py')
# 删除文件
>>> os.remove('test.py')
```

os模块并未提供**复制文件**的方法, *原因是复制文件并非由操作系统提供的系统调用, 理论上来说, 通过读写文件并可实现文件的复制 ;* 但python提供了`sutil`模块, 其中有`copyfile()`函数, 同时在该模块中, 还可以看到许多实用的函数, 可以将其看作`os`模块的补充

**注**: 由于对路径操作方法的混乱, 导致之后又加入了`pathlib`模块来进行路径操作, 同时从对字符串的粗糙操作变成了对`Path`对象的操作, 保证了程序的健壮性

# 序列化

**概念**: 变量从内存中变成可存储或传输对象的过程称为序列化; 将变量内容从序列化的对象重新读入到内存的过程称为反序列化

## pickle模块序列化

Python提供了`pickle`模块来实现序列化, 参考 {% post_link 4-模块详解 pickle模块 %}

- `pickle.dumps()`方法可以将任意对象序列化成一个`bytes`, 然后就可以把这个`bytes`写入文件
- `pickle.dump()`方法直接将对象序列化后写入一个file-like Object

类似与序列化过程, 反序列化的过程也有两个基本的方法

- `pickle.loads()` 方法可以将一个序列化后的对象的`bytes`反序列化成原对象
- `pickle.load()` 方法可以将一个file-like Object直接反序列化成原对象

**缺点**: 用pickle模块序列化的缺点与所有其它编程语言特有的序列化问题一样, 就是它只能用与Python, 且可能不同版本的Python彼此都不兼容, 因此, 只能用pickle保存那些不重要的数据, 不能成功地反序列化也没关系

## JSON

如果在不同的编程语言之间传递对象, 就必须把对象序列化为标准格式, 如XML, 但更好地方法是序列化为JSON, 因为**JSON表示出来就是一个字符串**, 可以被所有语言读取, 也可以方便的存储到磁盘或者通过网络传输, 并且**JSON比XML更快**, 而且可以**直接在Web页面中读取**

JSON表示的对象就是标准的JavaScript语言的对象，JSON和Python内置的数据类型对应如下：

| JSON类型   | Python类型 |
| :--------- | :--------- |
| {}         | dict       |
| []         | list       |
| "string"   | str        |
| 1234.56    | int或float |
| true/false | True/False |
| null       | None       |

Python内置的`json`模块提供了非常完善的Python对象到JSON格式的转换

与`pickle`模块相似, `json`模块也有`load()`, `loads()`和`dump()`, `dumps()`方法, 含义类似, 只是将序列化后的bytes换为符合JSON格式的字符串

### 进阶用法

Python中的`dict`对象可以直接序列化为JSON的`{}`对象, 但如果想将一个`class`对象序列化为JSON对象, 则还需传入将`class`对象转换为`dict`对象的函数的参数[`json.dumps(obj, default=函数名)`; `load()/loads()`函数相同, 需传入将`dict`对象转换为`class`对象的函数]

**例**:

```python
>>> class Student(object):
...     def __init__(self):
...			self.name = 'bob'
...     ...
>>> s = Student()
>>> json.dumps(s, default=lambda obj: obj.__dict__)
{"name": "bob", ...}
```

**注**: 一般对象都有一个特殊的`__dict__`属性, 用来存储实例变量

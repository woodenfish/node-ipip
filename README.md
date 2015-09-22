# node-ipip [![Build Status](https://travis-ci.org/ChiChou/node-ipip.svg?branch=master)](https://travis-ci.org/ChiChou/node-ipip) [![Coverage Status](https://img.shields.io/coveralls/ChiChou/node-ipip.svg)](https://coveralls.io/r/ChiChou/node-ipip) [![npm version](https://badge.fury.io/js/ipip.svg)](http://badge.fury.io/js/ipip)

[English Document](README.en.md)

适用于 Node.js 的 [ipip.net](http://ipip.net) IP 数据库查询模块。

## 入门

安装依赖项

    npm install ipip

[IP 地址库](http://s.qdcdn.com/17mon/17monipdb.dat) 由 17mon 提供，在 `npm install` 过程中将自动下载。

代码示例

    var ipip = require('ipip').IPIP;
    var ip = new IPIP();
    
    // 查询 IP 信息，以字典格式返回
    console.log(ip.ip('202.195.161.30'));

## 文档

### 查 IP

IPIP.ip(ip [, format])

**ip**

待查询的 IP 地址，如 `8.8.8.8`

**format** 

制定返回数据的格式，可设置为 `array` 或者 `dict`。 

* 免费版（dat 格式）数据包含国家、省份、城市、组织；
* 收费版包含国家、省份、城市、组织、运营商、经度、纬度、时区、行政区域代码。

设为 `array`（缺省）时返回格式如下：
    
    ['国家', '省份', '城市', '组织']

设为 `dict` 时返回格式如下：

    {
      country: '国家',
      province: '省份',
      city: '城市',
      organization: '组织' 
    }

## 提示

程序在初始化过程使用阻塞方法加载数据库到内存。

## 授权

MIT
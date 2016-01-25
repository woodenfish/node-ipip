# node-ipip [![Build Status](https://travis-ci.org/ChiChou/node-ipip.svg?branch=master)](https://travis-ci.org/ChiChou/node-ipip) [![Coverage Status](https://img.shields.io/coveralls/ChiChou/node-ipip.svg)](https://coveralls.io/r/ChiChou/node-ipip) [![npm version](https://badge.fury.io/js/ipip.svg)](http://badge.fury.io/js/ipip)

[中文文档](README.md)

A Node.js module to query geolocation information for an IP or domain, based on database by [ipip.net](http://ipip.net).

## Getting Started

Install the module:

    npm install ipip

[Database](http://s.qdcdn.com/17mon/17monipdb.zip) is provided by ipip.net and it will be automatically downloaded during installation.

## Documentation

### Load database

Since v2.0, the module itself is a loader function. Just pass the path to load a paid database file, or simply leaving it blank to use default free data.

    var ip = require('ipip')();

    // lookup an ip
    console.log(ip('202.195.161.30'));

Use an alternative database file path for paid data:

    var ip = require('ipip')('/path/to/your/17monip.datx');

**NOTE** Loading database is a synchronized function.

### Query

ip(ip [, format])

**ip**

IP address that you want to query. e.g. `8.8.8.8`

**format** 

Format of the information, shoule be `array` or `dict`. 

By default it will use the free version.

When set to `dict` you'll get an object that consists of four keys: `country`, `province`, `city`. e.g.:

    {
      country: '中国',
      province: '江苏',
      city: '镇江'
    }

Otherwise, it returns an array as following format: `['country', 'province', 'city']`.

For paid users (data file should have the "datx" extension), there are more fields: `['isp', 'latitude', 'longitude', 'timezone', 'timezone2', 'governcode']`

## Command line util

If installed globally, you can use `ipip` command in your shell to query IP information.

    ➜  ~ ipip 8.8.8.8 202.195.161.30
    Information for 8.8.8.8:
    country: GOOGLE
    province: GOOGLE
    city: N/A
    
    Information for 202.195.161.30:
    country: 中国
    province: 江苏
    city: 镇江

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Use make to run unit test.

## License

(C) Copyright 2016 ChiChou. Licensed under the MIT license.

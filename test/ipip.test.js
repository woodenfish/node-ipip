'use strict';

var expect = require('chai').expect,
  ipip = require('../lib/ipip.js'),
  IPIP = ipip.IPIP;

describe('IPIP', function() {
  var ip = ipip();

  it('should handle malformed input', function(done) {
    expect(function() {
      ip('202.x.x.x');
    }).to.throw(Error);

    expect(function() {
      ip('256.1.1.1');
    }).to.throw(Error);

    expect(function() {
      ip('8.8.4.4', 'invalid-format');
    }).to.throw(Error);

    done();
  });

  it('should accept numeric input', function() {
    expect(ip(0x040404)).to.have.a.property('city');
  });

  it('should return a dictionary', function() {
    expect(ip('202.195.161.30', 'dict')).to.have.a.property('city');
  });

  it('should return an array', function() {
    expect(ip('8.8.8.8', 'array')).to.be.an.aray;
  });

});

describe('Custom options', function() {
  it('should be able to load data from custom location', function(done) {
    expect(function() {
      ipip('/tmp/non-exist-file.dat');
    }).to.throw(Error);
    
    expect(function() {
      ipip('package.json');
    }).to.throw(Error);

    var path = require('path').join(__dirname, '..', '17monipdb.dat');
    var ip = ipip(path);
    expect(ip('8.8.8.8', 'dict')).to.have.a.property('city');

    done();
  });
});

'use strict';

var expect = require('chai').expect,
  fs = require('fs'),
  path = require('path'),
  reader = require('../lib/reader.js');

var datPath = path.join(__dirname, '..', '17monipdb.dat');
var content = fs.readFileSync(datPath);
var dat = new reader.Dat(content);

describe('ip lookup', function() {
  it('should support dat format', function(done) {
    var record = dat.lookup(0xCAC3A11E);
    expect(record).to.be.an.aray;
    expect(record).to.include.members(['中国', '江苏', '镇江', '江苏大学']);

    var record2 = dat.lookup(0xC0A80101);
    expect(record2).to.include.members(['局域网', '']);
    done();
  });

  // for the reason of copyright, 
  // run these test cases only when datx file is avaliable
  
  it('should support datx format when avaliable', function(done) {
    var datxPath = path.join(__dirname, '..', '17monipdb.datx');

    fs.stat(datxPath, function(err, stat) {
      if (!err) {
        var fileName = path.join(__dirname, '..', '17monipdb.datx');
        var buffer = fs.readFileSync(fileName);
        var datx = new reader.Datx(buffer);

        var record = datx.lookup(0xCAC3A11E);
        expect(record).to.be.an.aray;
        expect(record).to.include.members(['中国', '江苏', '镇江', '江苏大学']);

        var record3 = datx.lookup(0x00040404);
        expect(record3).to.not.be.undefined;

        expect()
      }
      done();
    });

  });
});

'use strict';
var sources = require('../src/');
var should = require('should');

describe('verify urls', function() {

  it('should verify arXiv source URL', function() {
    var out = sources.parseUrl('http://arxiv.org/abs/1208.0264v4');
    out.should.eql({
      source: 'arxiv.org',
      id: '1208.0264',
      version: '4'
    });

    var out = sources.parseUrl('http://arxiv.org/pdf/1208.0264.pdf');
    out.should.eql({
      source: 'arxiv.org',
      id: '1208.0264',
      version: undefined
    });
  });

  it('should fail for some random URLs', function() {
    var url = 'http://www.google.com/';
    var out = sources.parseUrl(url);
    should(out).not.be.ok;
  });

});

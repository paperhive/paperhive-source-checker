/**
 * @license PaperHive Chrome Extension v0.0.2
 * (c) 2015 Nico Schlömer <nico@paperhive.org>
 * License: GPL-3
 */
'use strict';

//console.log(parseUrl(test));
var urlParser = [
  function parseArxiv(url) {
    var idRegExp = '(\\d+\\.\\d+|.+/\\d+)(?:v(\\d+))?';
    var regExp = new RegExp(
      '^(?:https?://)?(?:.*\\.)?arxiv\.org/(?:abs|pdf)/' + idRegExp +
      '(?:\\.pdf)?(?:[#\\?].*)?$',
      'i' // case-insensitive matching
    );
    var result = regExp.exec(url);
    if (!result) return;

    var ret = {
      type: 'arxiv',
      id: result[1]
    };
    if (result[2]) {
      ret.revisionId = 'v' + result[2];
    }
    return ret;
  },
  function parseSpringer(url) {
    var regExp = /^(?:https?:\/\/)?link\.springer\.com\/(?:article\/)?([^\/]*)(?:%2F|\/)([^#\/]*)/i;
    var result = regExp.exec(url);
    if (!result) return;

    return {
      type: 'springer',
      id: result[1] + '/' + result[2]
    };
  }
];

var parseUrl = function(url) {
  for (var i = 0; i < urlParser.length; i++) {
    var result = urlParser[i](url);
    if (result) {
      return result;
    }
  }
};

module.exports = {
  parseUrl: parseUrl,
  hostnames: ['arxiv.org', 'link.springer.com']
};

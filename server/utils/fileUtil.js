'use strict';

const glob = require('glob');
const _ = require('lodash');

// 处理匹配表达式
const matches = (patterns, fn) => {
  var result = [];
  patterns.forEach((pattern) => {
    var exclusion = pattern.indexOf('!') === 0;
    if (exclusion) {
      pattern = pattern.slice(1);
    }
    var matches = fn(pattern);
    if (exclusion) {
      result = _.difference(result, matches);
    } else {
      result = _.union(result, matches);
    }
  });
  return result;
};

// 匹配文件
exports.matchesByPatterns = (patterns) => {
  if (!Array.isArray(patterns)) {
    if (typeof patterns === 'string') {
      patterns = [patterns];
    } else {
      return [];
    }
  }
  return matches(patterns, (pattern) => {
    return glob.sync(pattern);
  });
};

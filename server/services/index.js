'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

// 加载services服务
const servicePath = path.resolve(__dirname);

const services = fs.readdirSync(servicePath) || [];

const allServices = {};

services.forEach((file) => {
  const fileNameParser = path.parse(file);
  if (file !== 'index.js' && fileNameParser.ext === '.js') {
    const fn = require(path.join(servicePath, file));
    if (_.isFunction(fn)) {
      const singleService = allServices[fileNameParser.name] = {};
      fn(singleService, allServices);
    }
  }
});

module.exports = allServices;

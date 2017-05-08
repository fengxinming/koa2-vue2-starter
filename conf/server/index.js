'use strict';

const fs = require('fs');
const path = require('path');
// const deepAssign = require('deep-assign');

const defaults = module.exports = {

  // 端口
  port: +process.env.port || 5600,

  // 环境标识
  NODE_ENV: process.env.NODE_ENV || 'development',

  // 工程目录地址
  projectDir: process.cwd()

};










(fs.readdirSync(__dirname)).forEach((file) => {
  const extIndex = file.indexOf('.js');
  if (extIndex > 0 && file !== 'index.js') {
    defaults[file.slice(0, extIndex)] = require(path.join(__dirname, file))(defaults);
  }
});

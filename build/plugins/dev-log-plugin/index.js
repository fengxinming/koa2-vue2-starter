'use strict';

const nativePath = require('path');
const chalk = require('chalk');
const cfgConstants = require('../../../server/utils/cfg-constants');
const pkg = require(nativePath.join(cfgConstants.projectDir, 'package.json'));

class LogPlugin {
  constructor(port) {
    this.port = port;
  }

  apply(compiler) {
    compiler.plugin('done', () => {
      const address = `http://localhost:${this.port}`;
      console.log(`> ${pkg.name} is running at ${chalk.yellow(address)}\n`);
    });
  }
}

module.exports = LogPlugin;

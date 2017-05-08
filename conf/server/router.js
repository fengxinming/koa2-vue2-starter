'use strict';

const path = require('path');

module.exports = (common) => {
  const projectDir = common.projectDir;

  const defaults = {
    // 公用全局属性
    public: {
      routes: {
        exclude: [],
        dir: path.resolve(projectDir, 'server', 'routes')
      },
      apis: {
        dir: path.resolve(projectDir, 'server', 'apis')
      }
    }
  };

  return Object.assign({}, defaults.public, defaults[common.NODE_ENV]);
};

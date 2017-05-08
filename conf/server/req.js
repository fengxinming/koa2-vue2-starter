'use strict';

// 后台http请求配置
const defaults = {
  // 公用全局属性
  public: {
    gzip: true // 默认走nginx，需要解压缩
  },
  // 仅开发使用
  development: {
    api: 'http://192.168.100.95:58080', // 后台API接口地址
    testApi: 'http://192.168.1.120:21000'
  },
  // 仅测试环境设置
  13: {
    api: 'http://192.168.1.240/api' // 后台API接口地址
  },
  16: {
    api: 'http://192.168.1.241/api' // 后台API接口地址
  },
  qa: {
    api: 'http://10.173.189.150/api' // 后台API接口地址(QA)
  },
  // 仅产品环境使用
  production: {
    api: 'http://10.169.104.8/api' // P端后台API接口地址
  }
};

module.exports = (common) => {
  return Object.assign({}, defaults.public, defaults[common.NODE_ENV]);
};

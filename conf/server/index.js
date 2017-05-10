'use strict';

const path = require('path');
const _ = require('../../server/utils/cfg-constants');
const staticPathLen = _.staticPath.length;

module.exports = {
  // 服务启动相关配置
  server: {
    // 端口
    port: +process.env.port || +process.env.PORT || 3100
  },

  // 程序相关配置
  app: {
    // 网页模板路径
    viewsDir: _.viewsDir,

    // 配置文件目录
    confDir: _.confDir,

    // client存放目录
    clientDir: _.clientDir,

    // 日志文件存放目录
    logsDir: _.logsDir,

    // 配置文件路径
    logsCfg: _.logsCfg,

    // 静态文件目录
    staticDir: _.staticDir,

    // 静态资源前缀
    staticPath: _.staticPath,

    // 静态文件的映射
    staticMappings: {},

    // 自定义favicon
    favicon: undefined,

    // 是否开启模板缓存
    viewsCache: _.NODE_ENV === 'production',
    // use: serverConfig.app.stylus.use.concat(require('nib')()),
    // import: ['~nib/lib/nib/index.styl'].concat(serverConfig.app.stylus.import),
    // stylus 配置
    stylus: {
      // 是否开启stylus插件
      enabled: true,
      use: [
        require('nib')(),
        // require('poststylus')(['autoprefixer', 'rucksack-css'])
        require('poststylus')([require('autoprefixer')({
          browsers: ['last 30 versions', 'ie > 8']
        }), 'rucksack-css'])
      ],
      import: [
        '~nib/lib/nib/index.styl',
        _.customStylusUtils
      ],
      src: (cssPath) => path.join(_.clientDir, cssPath.slice(staticPathLen).replace('.css', '.styl')),
      dest: (cssPath) => path.join(_.staticDir, cssPath.slice(staticPathLen))
    }
  },

  // http请求相关配置
  req: {
    // 默认走nginx，需要解压缩
    gzip: true
  },

  // 路由配置
  router: {
    routes: {
      exclude: [],
      dir: path.resolve(_.projectDir, 'server', 'routes')
    },
    apis: {
      dir: path.resolve(_.projectDir, 'server', 'apis')
    }
  }
};

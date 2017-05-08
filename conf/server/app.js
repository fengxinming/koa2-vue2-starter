'use strict';
const path = require('path');
module.exports = (common) => {
  const NODE_ENV = common.NODE_ENV;
  const staticPath = '/static';
  const staticPathLen = staticPath.length;
  const projectDir = common.projectDir;
  const staticDir = path.resolve(projectDir, 'public');
  const clientDir = path.resolve(projectDir, 'client');


  const defaults = {
    // 公用全局属性
    public: {
      // 网页模板路径
      viewsDir: path.resolve(projectDir, 'server', 'views'),

      // 配置文件目录
      confDir: path.resolve(projectDir, 'conf'),

      // client存放目录
      clientDir: clientDir,

      // 日志文件
      logsDir: path.resolve(projectDir, 'logs'),

      // 静态文件目录
      staticDir: staticDir,

      // 静态资源前缀
      staticPath: staticPath,

      // 静态文件的映射
      staticMappings: {},

      // 自定义favicon
      favicon: undefined,

      // 是否开启模板缓存
      viewsCache: NODE_ENV === 'production',
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
          path.join(clientDir, 'css/utils/**/*.styl')
        ],
        src: (cssPath) => path.join(clientDir, cssPath.slice(staticPathLen).replace('.css', '.styl')),
        dest: (cssPath) => path.join(staticDir, cssPath.slice(staticPathLen))
      }
    }
  };

  return Object.assign({}, defaults.public, defaults[NODE_ENV]);
};

'use strict';

module.exports = (service, services) => {

  service.entry = (ctx, next) => {
    ctx.throw(500, '报错');
  };

};

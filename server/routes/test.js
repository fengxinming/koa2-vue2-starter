'use strict';

module.exports = (services) => {
  return [{
    url: '/entry',
    use: services.test.entry
  }];
};

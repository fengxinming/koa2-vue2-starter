'use strict';

export default (router) => {
  router.push({
    name: 'index',
    path: '/',
    redirect: { name: 'flight.search' }
  });
};

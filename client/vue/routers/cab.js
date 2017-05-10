'use strict';

const cabSearch = resolve => require(['../views/cab/search'], resolve);

export default (router) => {
  router.push({
    name: 'cab.search',
    path: '/cab',
    component: cabSearch
  });
};

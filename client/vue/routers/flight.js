'use strict';

const flightSearch = resolve => require(['../views/flight/search'], resolve);

export default (router) => {
  router.push({
    name: 'flight.search',
    path: '/flight',
    component: flightSearch
  });
};

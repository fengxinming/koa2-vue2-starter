'use strict';

import $http from '../../commons/http';

export default () => {
  return $http({
    method: 'POST',
    url: '/flight/address/provinces2cities',
    // transformResponse: [function(data) {
    //   if (typeof data === 'string') {
    //     try {
    //       data = JSON.parse(data.replace(/provinceID|cityID/g, 'value')
    //         .replace(/province|city/g, 'label')
    //         .replace(/cities/g, 'children'));
    //     } catch (e) { /* Ignore */ }
    //   }
    //   return data;
    // }],
    data: {}
  }).then((res) => {
    return (res.data.result || []).map((n) => {
      return {
        label: n.province,
        value: n.provinceID,
        children: (n.cities || []).map((m) => {
          return {
            label: m.city,
            value: m.cityID
          };
        })
      };
    });
  });
};

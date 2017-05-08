'use strict';

import Vuex from 'vuex';
import $http from '../../commons/http';

const strict = process.env.NODE_ENV !== 'production';

export const A_INIT_CITIES = 'A_INIT_CITIES';
export const M_INIT_CITIES = 'M_INIT_CITIES';

export const store = new Vuex.Store({
  strict,
  state: {
    cities: {
      cities: [],
      hotCities: []
    }
  },
  actions: {
    [A_INIT_CITIES]({ commit }, params) {
      $http({
        method: 'POST',
        url: '/flight/airport/cityList',
        data: params || {}
      }).then((res) => {
        commit(M_INIT_CITIES, (res.data || {}).result);
      });
    }
  },
  mutations: {
    [M_INIT_CITIES](state, data) {
      state.cities = data;
    }
  }

});

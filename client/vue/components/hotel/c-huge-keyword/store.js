'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import $http from '../../../commons/http';

const strict = process.env.NODE_ENV !== 'production';

export const A_INIT_AREA = 'A_INIT_AREA';
export const M_INIT_AREA = 'M_INIT_AREA';

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict,
  state: {
    areaCache: [],
    areas: []
  },
  actions: {
    [A_INIT_AREA]({ commit }, params) {
      $http({
        method: 'POST',
        url: '/hotel/address/areaList',
        data: params || {}
      }).then((res) => {
        console.log(res);
        commit(M_INIT_AREA, (res.data || {}).result);
      });
    }
  },
  mutations: {
    [M_INIT_AREA](state, data) {
      state.areas = data.areaList || [];
    }
  }

});

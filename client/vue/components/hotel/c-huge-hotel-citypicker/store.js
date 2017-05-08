'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import $http from '../../../commons/http';

const strict = process.env.NODE_ENV !== 'production';

export const A_INIT_CITIES = 'A_INIT_CITIES';
export const M_INIT_CITIES = 'M_INIT_CITIES';

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict,
  state: {
    cities: {
      originalData: [],
      cities: [],
      hotCities: [],
      travelApplyCities: [],
      historyCities: []
    }
  },
  actions: {
    [A_INIT_CITIES]({ commit }, params) {
      $http({
        method: 'POST',
        url: '/hotel/address/cityList',
        data: params || {}
      }).then((res) => {
        console.log(res);
        commit(M_INIT_CITIES, (res.data || {}).result);
      });
    }
  },
  mutations: {
    [M_INIT_CITIES](state, data) {
      state.cities.originalData = data.cityList || [];
      let map = {};
      let spell;
      (data.cityList || []).forEach(c=> {
        spell = c.spell.charAt(0).toUpperCase();
        map[spell] = map[spell] || [];
        map[spell].push(c);
      });
      Object.keys(map).forEach(key=> {
        state.cities.cities.push({
          firstLetter: key,
          cityList: map[key]
        });
      });
    }
  }

});

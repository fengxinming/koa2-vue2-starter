'use strict';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  state: {
    // 查询出租车列表的条件
    cabParams: {}
  },
  mutations,
  actions,
  getters
};

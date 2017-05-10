'use strict';

import {
  M_SEARCH_CABS
} from './types';

const mutations = {

  /**
   * 调用完成出租车搜索之后更新页面数据
   * @param {Object} state 固定的state对象
   * @param {Array} data 异步接口返回的数据
   */
  [M_SEARCH_CABS](state, data) {
    state.airline = data || {};
  }
};

export default mutations;

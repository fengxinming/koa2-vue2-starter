'use strict';

import {
  A_SEARCH_CABS,
  M_SEARCH_CABS
} from './types';
import $http from '../../commons/http';

const actions = {

  /**
   * 出租车列表搜索
   * @param {Object} param 包含state, commit
   * @param {Object} params 搜索条件
   */
  [A_SEARCH_CABS]({ state, commit }, params) {
    return $http({
      method: 'POST',
      url: '',
      data: params
    }).then((res) => {
      commit(M_SEARCH_CABS, res.data.result);
      return res.data.result;
    });
  }
};

export default actions;

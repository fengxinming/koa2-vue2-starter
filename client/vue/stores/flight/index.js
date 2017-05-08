'use strict';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  state: {
    // 查询机票列表的条件
    airlineParams: {
      depcity: 'SZX',
      depcitycn: '深圳',
      arrcity: 'PEK',
      arrcitycn: '北京',
      depdate: '',
      returndate: '',
      voyagetype: 1,
      queryBySeatClass: false,
      seatclasstypes: null,
      children: 0,
      isReturn: false
    }
  },
  mutations,
  actions,
  getters
};

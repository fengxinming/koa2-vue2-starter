'use strict';

import * as types from './types';

const mutations = {
  [types.UPDATE_LOADING](state, status) {
    state.isLoading = status;
  },
  [types.UPDATE_DIRECTION](state, direction) {
    state.direction = direction;
  }
};

export default mutations;

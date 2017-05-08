'use strict';

import moment from 'moment';
import utils from '../commons/processing';

export default {

  // 日期过滤
  ['date-filter'](val, format) {
    if (val === null || typeof val === 'undefined') {
      return val;
    }
    return moment(val).format(format || 'YYYY-MM-DD');
  },

  // 星期过滤
  'week-filter': utils.getLabelOfWeek,

  // 证件类型
  'identity-filter': utils.getLabelOfIdentity,

  // 往返时长
  'takes-time-filter': utils.takesTime,

  // 隐藏id
  'hide-identity-filter': utils.hideIdentity

};

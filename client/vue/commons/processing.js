'use strict';

import moment from 'moment';

const WEEK_LABELS = window.App.globals.WEEK_LABELS;
const DAY_LABELS = {
  '-2': '前天',
  '-1': '昨天',
  '0': '今天',
  '1': '明天',
  '2': '后天'
};
const IDTYPES = window.App.globals.IDTYPES;
const LEAP_MONTHS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const NONLEAP_MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const _ = {

  getLabelOfWeek(val, special) {
    if (val === null || typeof val === 'undefined') {
      return val;
    }
    if (special) {
      val = moment(val);
      return DAY_LABELS[val.diff(moment().format('YYYY-MM-DD'), 'days')] || WEEK_LABELS[val.day()];
    } else {
      return WEEK_LABELS[moment(val).day()];
    }
  },

  getLabelOfIdentity(val) {
    if (val === null || typeof val === 'undefined') {
      return val;
    }
    return IDTYPES[val];
  },

  daysInYear(year) {
    return _.isLeapYear(year) ? 366 : 365;
  },

  daysInMonth(year, month) {
    return _.isLeapYear(year) ? LEAP_MONTHS[month] : NONLEAP_MONTHS[month];
  },

  isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  },

  takesTime(val, other, format) {
    if (!val) {
      return val;
    }
    const mbegin = moment(val);
    const mend = moment(other);
    const diff = mend.diff(mbegin, 'seconds');
    return _.secondsFormat(diff, format);
  },

  seconds2HMS(diff) {
    const seconds = diff % 60;
    const minutes = (diff - seconds) % 3600;
    // const hours = (diff - minutes - seconds) % 86400;
    const hours = diff - minutes - seconds;
    return [hours / 3600, minutes / 60, seconds];
  },

  secondsFormat(diff, format) {
    format = format || 'HH小时mm分';
    let val = _.seconds2HMS(diff);
    val = format.replace(/HH/g, val[0]).replace(/mm/g, val[1]).replace(/ss/g, val[2]);
    return val;
  },

  milliseconds2HMS(diff) {
    const millisecond = diff % 1000;
    diff = diff - millisecond;
    return _.seconds2HMS(diff / 1000);
  },

  get517Rule(rule) {
    return !rule ? '' : rule.replace(/\b[A-Z]\:/, '')
      .split('^')
      .map(segment => {
        var _segments = segment.split('|');
        return _segments[0] + (_segments[1] || '');
      })
      .join(',');
  },

  hideIdentity(val, noIdentity) {
    if (!val) {
      return val;
    }
    // 身份证处理
    if (!noIdentity) {
      return val.slice(0, 4) + '***********' + val.slice(15);
    } else {
      return val.slice(0, 2) + '**********' + val.slice(-1, val.length);
    }
  }

};

export default _;

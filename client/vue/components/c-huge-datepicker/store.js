'use strict';

import Vuex from 'vuex';
import moment from 'moment';

const strict = process.env.NODE_ENV !== 'production';

export const M_INIT_CALENDAR = 'M_INIT_CALENDAR';

export const store = new Vuex.Store({
  strict,
  state: {
    calendars: []
  },
  mutations: {
    [M_INIT_CALENDAR](state, params) {
      const calendars = [];
      const disabledFn = params.disabledDate;
      for (let count = 0, duration = +params.duration; count < duration; count++) {
        let now = new Date();
        const month = now.getMonth() + count;
        now = moment([now.getFullYear(), month, 1]);
        const calendar = [];
        let day = now.days();
        for (let i = 0; i < day; i++) {
          calendar[i] = { disabled: true, selected: false };
        }
        for (let i = 1, max = now.daysInMonth(); i <= max; i++, day++) {
          now.date(i);
          const currentDate = now.format('YYYY-MM-DD');
          calendar[day] = {
            date: i,
            datetime: currentDate,
            disabled: disabledFn(currentDate)
          };
        }
        calendars[count] = {
          month,
          calendar
        };
      }
      state.calendars = calendars;
    }
  }

});

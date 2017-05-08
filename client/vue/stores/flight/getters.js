'use strict';

import moment from 'moment';

// 过滤舱位
function seatsFilter(cabins, seatType) {
  return (cabins || []).filter(cabin => seatType ? cabin.seatType === '经济舱' : cabin.seatType !== '经济舱');
}

const getters = {
  /**
   * 分类经济舱
   */
  filterEconomySeatGetter: (state) => seatsFilter(state.cabin.cabins, true),

  /**
   * 分类头等舱
   */
  filterPremiumSeatGetter: (state) => seatsFilter(state.cabin.cabins, false),

  /**
   * 获取搜索参数
   */
  airlineParamsGetter: (state) => Object.assign({}, state.airlineParams),

  /**
   * 航班信息
   */
  airlineInfosGetter: (state) => {
    const airlineFilters = state.airlineFilters;
    const keys = Object.keys(airlineFilters);
    return !keys.length ? state.airline.airlineInfos : state.airline.airlineInfos.filter((n) => {
      for (let key of keys) {
        if (key === 'time') {
          const time = airlineFilters.time[0];
          if (!time.value) {
            continue;
          }
          const range = time.value.split('-');
          const takeofftime = moment(n.takeofftime.slice(11, 16), 'HH:mm');
          if (takeofftime.isSameOrAfter(moment(range[0], 'HH:mm')) && takeofftime.isSameOrBefore(moment(range[1], 'HH:mm'))) {
            continue;
          } else {
            return false;
          }
        }
        if (key === 'nonstop') {
          const nonstop = airlineFilters.nonstop[0];
          if (nonstop && nonstop.value && n.isstop) {
            return false;
          }
          continue;
        }
        if (key === 'airline') {
          const airline = airlineFilters.airline;
          if (!airline.length) {
            continue;
          }
          const match = airline.some((option) => {
            return option.value === n.carrier;
          });
          if (!match) {
            return false;
          }
          continue;
        }
      }
      return true;
    });
  },

  /**
   * 获取选择的舱位信息
   */
  cabinInfosGetter: (state) => state.cabins.map((cabin) => Object.assign({}, cabin)),

  /**
   * 获取已选的乘机人
   */
  selectedPassengersGetter: (state) => state.selectedPassengers.map((passenger) => Object.assign({}, passenger))
};

export default getters;

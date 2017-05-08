'use strict';

import moment from 'moment';
import {
  M_INIT_AIRLINE_PARAMS,
  M_UPDATE_AIRLINE_PARAMS,
  M_SEARCH_AIRLINES,
  M_SET_CABIN_PARAMS,
  M_SEARCH_SEAT_CLASS,
  M_SET_CABININFO,
  M_GET_PREORDER_INFO,
  M_SORT_AIRLINES,
  M_FILTER_AIRLINES,
  M_INIT_PASSENGERS,
  M_UPDATE_SED_PASSENGERS,
  M_CLEAN_FLIGHTCACHE
} from './types';

const mutations = {

  /**
   * 初始化查询提交参数
   * @param {Object} state 固定的state对象
   */
  [M_INIT_AIRLINE_PARAMS](state) {
    const curentDate = moment().format('YYYY-MM-DD');
    let depdate = state.airlineParams.depdate;
    if (!depdate || moment(depdate).isBefore(curentDate)) {
      depdate = state.airlineParams.depdate = curentDate;
    }
    const returndate = state.airlineParams.returndate;
    if (!returndate || moment(returndate).isBefore(depdate)) {
      state.airlineParams.returndate = moment(depdate).add(1, 'days').format('YYYY-MM-DD');
    }
  },

  /**
   * 更新state参数缓存
   * @param {Object} state 固定的state对象
   * @param {Object} params 需要缓存的参数对象
   */
  [M_UPDATE_AIRLINE_PARAMS](state, params) {
    Object.assign(state.airlineParams, params);
  },

  /**
   * 调用完成航班搜索之后更新页面数据
   * @param {Object} state 固定的state对象
   * @param {Array} data 异步接口返回的数据
   */
  [M_SEARCH_AIRLINES](state, data) {
    state.airline = data || {};
  },

  /**
   * 暂存舱位查询参数
   * @param {Object} state 固定的state对象
   * @param {Object} params 查询条件
   */
  [M_SET_CABIN_PARAMS](state, params) {
    // params.children = state.airlineParams.children;
    state.cabinParams = params;
  },

  /**
   * 查询舱位信息
   * @param {Object} state 固定的state对象
   * @param {Array} data 异步接口返回的数据
   */
  [M_SEARCH_SEAT_CLASS](state, data) {
    state.cabin = data || {};
  },

  /**
   * 调用完成航班搜索之后更新页面数据
   * @param {Object} state 固定的state对象
   * @param {Array} data 异步接口返回的数据
   */
  [M_SET_CABININFO](state, cabin) {
    const tmp = Object.assign({}, state.cabin);
    delete tmp.cabins;
    tmp.cabin = cabin;
    // 保存返程舱位
    if (cabin.isReturn) {
      const len = state.cabins.length;
      state.cabins = len > 0 ? [state.cabins[len - 1], tmp] : [tmp];
    } else {
      state.cabins = [tmp];
    }
  },

  /**
   * 调用完成航班搜索之后更新页面数据
   * @param {Object} state 固定的state对象
   * @param {Array} data 异步接口返回的数据
   */
  [M_GET_PREORDER_INFO](state, data) {
    if (!data) {
      data = {
        rates: [],
        insurance: [],
        totalPrice: 0,
        flightTips: 0
      };
    } else {
      let flightTips = 0;
      let totalPrice = 0;
      if (data.rates.length > 1) {
        data.rates.forEach((n, i) => {
          let adultPrice = n.adultPrice;
          totalPrice += adultPrice.salePrice;
          flightTips += adultPrice.airportTax + adultPrice.fuelTax;
        });
      } else {
        const adultPrice = data.rates[0].adultPrice;
        totalPrice = adultPrice.salePrice;
        flightTips = adultPrice.airportTax + adultPrice.fuelTax;
      }
      data.totalPrice = totalPrice;
      data.flightTips = flightTips;
    }
    state.preorder = data;
  },

  /**
   * 更新排序字段
   * @param {Object} state 固定的state对象
   * @param {Object} params 用于更新的参数
   */
  [M_SORT_AIRLINES](state, params) {
    let asc = null;
    switch (params.sortBy) {
      case 'time':
        asc = state.airlineSortFields[0].order === 'asc';
        state.airlineSortFields[0].order === 'asc';
        Object.assign(state.airlineSortFields[0], asc ? {
          order: 'desc',
          label: '晚-早',
          selected: true
        } : {
          order: 'asc',
          label: '早-晚',
          selected: true
        });
        Object.assign(state.airlineSortFields[1], {
          selected: false,
          label: '价格',
          order: 'desc'
        });
        state.airline.airlineInfos.sort((a, b) => {
          return (asc ? -1 : 1) * moment(a.takeofftime).diff(b.takeofftime, 'minutes');
        });
        break;
      case 'price':
        asc = state.airlineSortFields[1].order === 'asc';
        Object.assign(state.airlineSortFields[1], asc ? {
          order: 'desc',
          label: '从高到低',
          selected: true
        } : {
          order: 'asc',
          label: '从低到高',
          selected: true
        });
        Object.assign(state.airlineSortFields[0], {
          selected: false,
          label: '时间',
          order: 'desc'
        });
        state.airline.airlineInfos.sort((a, b) => {
          a = a.cabins[0].zizparprice;
          b = b.cabins[0].zizparprice;
          return asc ? a - b : b - a;
        });
        break;
      case 'filter':
        state.airlineSortFields[2].selected = true;
        break;
    }
  },

  /**
   * 更新过滤字段
   * @param {Object} state 固定的state对象
   * @param {Object} params 用于更新的参数
   */
  [M_FILTER_AIRLINES](state, params) {
    state.airlineFilters = params;
  },

  /**
   * 调用完成初始化乘机人列表
   * @param {Object} state 固定的state对象
   * @param {Object} data 异步数据返回的值
   */
  [M_INIT_PASSENGERS](state, data) {
    state.passengers = data || {};
  },

  /**
   * 更新已选乘机人
   * @param {Object} state 固定的state对象
   * @param {Object} data 异步数据返回的值
   */
  [M_UPDATE_SED_PASSENGERS](state, data) {
    state.selectedPassengers = data || [];
  },

  [M_CLEAN_FLIGHTCACHE](state, data) {
    state.flight.cabinParams = {};
    state.flight.cabins = [];
  }
};

export default mutations;

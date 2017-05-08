'use strict';

import {
  A_SEARCH_AIRLINES,
  M_SEARCH_AIRLINES,
  A_SEARCH_SEAT_CLASS,
  M_SEARCH_SEAT_CLASS,
  A_GET_PREORDER_INFO,
  M_GET_PREORDER_INFO,
  A_SUBMIT_FLIGHT_ORDER,
  A_INIT_PASSENGERS,
  M_INIT_PASSENGERS,
  A_SAVE_PASSENGER,
  A_GET_PASSENGER,
  M_GET_PASSENGER
} from './types';
import $http from '../../commons/http';

const actions = {

  /**
   * 航班列表搜索
   * @param {Object} param 包含state, commit
   * @param {Object} params 搜索条件
   */
  [A_SEARCH_AIRLINES]({ state, commit }, params) {
    return $http({
      method: 'POST',
      url: '/flight/airport/queryApiFlight',
      data: params ? Object.assign({}, state.airlineParams, params) : state.airlineParams,
      testApi: false
    }).then((res) => {
      commit(M_SEARCH_AIRLINES, res.data.result);
      return res.data.result;
    });
  },

  /**
   * 查询舱位
   * @param {Object} param 包含state, commit
   * @param {Object} isReturn 是否从缓存中取数据
   */
  [A_SEARCH_SEAT_CLASS]({ state, commit }, isReturn) {
    const cabinParams = state.cabinParams;
    return $http({
      method: 'POST',
      url: '/flight/airport/querySeatclass',
      data: isReturn ? Object.assign({}, cabinParams, {
        depairport: cabinParams.arrairport,
        arrairport: cabinParams.depairport,
        depdate: cabinParams.leaveDate,
        leaveDate: cabinParams.depdate
      }) : state.cabinParams
    }).then((res) => {
      commit(M_SEARCH_SEAT_CLASS, res.data.result);
      return res.data;
    });
  },

  /**
   * 预下单接口
   * @param {Object} param 包含state, commit
   */
  [A_GET_PREORDER_INFO]({ state, commit }) {
    return $http({
      method: 'POST',
      url: '/flight/order/prepare',
      data: {
        hasChildren: false,
        rates: state.cabins.map((cabin) => {
          return {
            flight: {
              flightNo: cabin.flightno,
              departAirport: {
                cityName: cabin.depCitych,
                code: cabin.depAirport,
                name: cabin.depAirportch,
                cityCode: cabin.depCity
              },
              arriveAirport: {
                cityName: cabin.arrCitych,
                code: cabin.arrAirport,
                name: cabin.arrAirportch,
                cityCode: cabin.arrCity
              },
              departDate: cabin.depDate,
              arriveDate: cabin.arrivetime.slice(0, 10),
              departTime: cabin.takeofftime.slice(11),
              arriveTime: cabin.arrivetime.slice(11),
              departTerminal: cabin.fromterminal,
              arriveTerminal: cabin.arrterminal
            },
            cabin: {
              policyId: cabin.cabin.policyId,
              channel: cabin.cabin.channelType,
              seatCode: cabin.cabin.seatCode,
              seatType: cabin.cabin.seatType
            },
            adultPrice: {
              ticketPrice: cabin.cabin.parprice,
              salePrice: cabin.cabin.zizparprice,
              // fuelTax: 50,
              // airportTax: 50,
              discount: cabin.cabin.discount
            }
            // childPrice: {
            //   ticketPrice: 1000,
            //   salePrice: 800,
            //   fuelTax: 50,
            //   airportTax: 50,
            //   discount: 0.8
            // }
          };
        })
      }
    }).then((res) => {
      commit(M_GET_PREORDER_INFO, res.data.result);
      const preorder = Object.assign({}, state.preorder);
      const insurancesMap = {}; // 重新分类保险
      preorder.insurance.forEach((insurance) => {
        const productType = insurance.productType;
        let arr = insurancesMap[productType] || (insurancesMap[productType] = []);
        arr[arr.length] = insurance;
      }, this);
      preorder.newInsurance = Object.keys(insurancesMap).map((key) => insurancesMap[key].sort((a, b) => b.price - a.price)[0]);
      return preorder;
    });
  },

  /**
   * 下单接口
   * @param {Object} param 包含state
   * @param {Object} param2 需要提交的参数
   */
  [A_SUBMIT_FLIGHT_ORDER]({ state }, param2) {
    return $http({
      method: 'POST',
      url: '/flight/order/submit',
      data: param2
    }).then((res) => {
      return res.data.result || {};
    });
  },

  /**
   * 初始化乘机人
   * @param {*} param0 {Object} param 包含state, commit
   * @param {*} param2 请求参数
   */
  [A_INIT_PASSENGERS]({ state, commit }, param2) {
    $http({
      method: 'POST',
      url: '/flight/passenger/getPassengers',
      data: param2 || {}
    }).then((res) => {
      commit(M_INIT_PASSENGERS, (res.data || {}).result);
    });
  },

  /**
   * 保存乘机人
   * @param {*} param0 {Object} param 包含state, commit
   * @param {*} param2 请求参数
   */
  [A_SAVE_PASSENGER]({ state, commit }, param2) {
    return $http({
      method: 'POST',
      url: param2.id ? '/flight/passenger/upPassenger' : '/flight/passenger/addPassenger',
      data: param2 || {}
    }).then((res) => {
      return (res.data || {}).result;
    });
  },

  /**
   * 获取单个乘机人
   * @param {*} param0 {Object} param 包含state, commit
   * @param {*} param2 请求参数
   */
  [A_GET_PASSENGER]({ state, commit }, param2) {
    $http({
      method: 'POST',
      url: '/flight/passenger/getPassengers',
      data: param2 || {}
    }).then((res) => {
      commit(M_GET_PASSENGER, (res.data || {}).result);
    });
  }
};

export default actions;

'use strict';

/**
 * 机票搜索
 */
export const M_UPDATE_AIRLINE_PARAMS = 'M_UPDATE_AIRLINE_PARAMS'; // 缓存机票搜索数据
export const M_INIT_AIRLINE_PARAMS = 'M_INIT_AIRLINE_PARAMS'; // 初始化机票搜索条件

/**
 * 机票航班搜索
 */
export const A_SEARCH_AIRLINES = 'A_SEARCH_AIRLINES'; // 航班列表搜索
export const M_SEARCH_AIRLINES = 'M_SEARCH_AIRLINES';
export const A_SEARCH_API_FLIGHT = 'A_SEARCH_API_FLIGHT'; // 航班列表搜索
export const M_SEARCH_API_FLIGHT = 'M_SEARCH_API_FLIGHT';

/**
 * 机票舱位查询
 */
export const A_SEARCH_SEAT_CLASS = 'A_SEARCH_SEAT_CLASS'; // 查询舱位
export const M_SEARCH_SEAT_CLASS = 'M_SEARCH_SEAT_CLASS';

export const M_SET_CABIN_PARAMS = 'M_SET_CABIN_PARAMS'; // 缓存机票舱位数据查询

export const M_SET_CABININFO = 'M_SET_CABININFO'; // 缓存选择的舱位

// 预下单接口
export const A_GET_PREORDER_INFO = 'A_GET_PREORDER_INFO';
export const M_GET_PREORDER_INFO = 'M_GET_PREORDER_INFO';

// 预下单接口
export const A_SUBMIT_FLIGHT_ORDER = 'A_SUBMIT_FLIGHT_ORDER';

// 航班排序
export const M_SORT_AIRLINES = 'M_SORT_AIRLINES';

// 更新航班过滤I
export const M_FILTER_AIRLINES = 'M_FILTER_AIRLINES';

// 查询乘机人列表
export const A_INIT_PASSENGERS = 'A_INIT_PASSENGERS';
export const M_INIT_PASSENGERS = 'M_INIT_PASSENGERS';

// 查询单个乘机人
export const A_GET_PASSENGER = 'A_GET_PASSENGER';
export const M_GET_PASSENGER = 'A_GET_PASSENGER';

// 保存乘机人
export const A_SAVE_PASSENGER = 'A_SAVE_PASSENGER';

// 更新已选的乘机人
export const M_UPDATE_SED_PASSENGERS = 'M_UPDATE_SED_PASSENGERS';

// 清除机票缓存
export const M_CLEAN_FLIGHTCACHE = 'M_CLEAN_FLIGHTCACHE';

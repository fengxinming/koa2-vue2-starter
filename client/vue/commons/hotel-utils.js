'use strict';
import moment from 'moment';
// import utils from 'javascripts/commons/utils';
// import EasyStorage from 'javascripts/commons/easy-storage';
const TODAY = moment().startOf('date');
// const DAYS = ['日', '一', '二', '三', '四', '五', '六'];
const GRADE_SHORT_LABEL = ['', '一', '二', '三', '四', '五'];
// const DAY_LABEL = ['今天', '明天', '后天'];
const FILTER_SETTING = {
  // 价格区间
  price: {
    multiple: false,
    options: [
      {
        value: 0,
        minPrice: 0,
        maxPrice: 0,
        text: '不限'
      },
      {
        value: 1,
        minPrice: 0,
        maxPrice: 150,
        text: '￥150以下'
      },
      {
        value: 2,
        minPrice: 150,
        maxPrice: 300,
        text: '￥150-￥300'
      },
      {
        value: 3,
        minPrice: 301,
        maxPrice: 450,
        text: '￥301-￥450'
      },
      {
        value: 4,
        minPrice: 451,
        maxPrice: 600,
        text: '￥451-￥600'
      },
      {
        value: 5,
        minPrice: 600,
        maxPrice: 1000,
        text: '￥600-￥1000'
      },
      {
        value: 6,
        minPrice: 1000,
        maxPrice: 999999,
        text: '￥1000以上'
      }
    ]
  },
  // 星级
  grade: {
    multiple: true,
    options: [
      {
        value: 0,
        text: '不限'
      },
      {
        value: 1,
        text: '快捷酒店'
      },
      {
        value: 2,
        text: '二星/经济'
      },
      {
        value: 3,
        text: '三星/舒适'
      },
      {
        value: 4,
        text: '四星/高档'
      },
      {
        value: 5,
        text: '五星/豪华'
      }
    ]
  },
  // 商圈/位置
  location: {
    multiple: false,
    options: null
  },
  // 排序
  sort: {
    multiple: false,
    options: [
      {
        text: '蜘蛛推荐',
        value: 0
      },
      {
        text: '价格优先',
        value: 1
      },
      {
        text: '距离最近',
        value: 2
      }
      // {
      //     text: '我的酒店',
      //     value: 3
      // }
    ]
  },
  // 房型
  roomType: {
    multiple: false,
    options: [
      {
        value: 0,
        text: '不限'
      },
      {
        value: 1,
        text: '大床'
      },
      {
        value: 2,
        text: '双床'
      },
      {
        value: 3,
        text: '三人房/家庭房/可加床'
      }
    ]
  }
};

const SERVICES_MAP = {
  breakfast: '早餐服务',
  laundry: '洗衣服务',
  luggage: '行李寄存处',
  rouse: '唤醒服务',
  reception: '24小时前台服务',
  childcare: '看护小孩服务',
  entertain: '接待外宾',
  meals: '送餐服务',
  airportPickup: '接机服务',
  creditCard: '接受信用卡',
  portablePet: '可携带宠物',
  dockingStation: '接站服务',
  carRental: '租车',
  airCondition: '空调',
  heater: '暖气',
  dryer: '吹风机',
  internationalCall: '国际长途电话',
  freeInlandCall: '免费国内长途电话',
  freeCityCall: '免费市内电话',
  hotWater: '24小时热水',
  carPark: '停车位',
  chineseRestaurant: '中式餐厅',
  westernRestaurant: '西式餐厅',
  disabled: '残疾人设施',
  wifi: '公共区域WIFI',
  outSwimming: '室外游泳池',
  inSwimming: '室内游泳池',
  meeting: '会议室',
  gym: '健身房',
  chessRoom: '棋牌室',
  businessCenter: '商务中心',
  atm: '自动提款机',
  press: '熨衣服务',
  spa: 'SPA',
  hotSpring: '温泉',
  bar: '酒吧',
  sauna: '桑拿',
  lift: '电梯',
  noSmoking: '无烟房'
};
const SERVICES_MAP_VALUE_KEY = (()=>{
  const map = {};
  for (let key in SERVICES_MAP) {
    if (SERVICES_MAP.hasOwnProperty(key)) {
      map[SERVICES_MAP[key]] = key;
    }
  }
  return map;
})();
const STATUS_SERVICE = ['无', '免费', '收费'];

function toKebabCase(str) {
  return str.replace(/[A-Z]/g, (segment, index) => {
    if (index === 0) {
      return segment;
    } else {
      return '-' + segment.toLowerCase();
    }
  });
}
// var cityCenterStorage = new EasyStorage('CITY_CENTER', 'local');
// cityCenterStorage.init({});

export default {
  TODAY,
  // setTitle: utils.setTitle,
  // formatDate(date, format){
  //     return moment(date).format(format || 'YYYY-MM-DD');
  // },

  // getDayLabel(date, prefix) {
  //   var targetDate = moment(date).startOf('date'),
  //     diffDate = targetDate.diff(TODAY, 'days');
  //   return DAY_LABEL[diffDate] || (prefix || '周') + DAYS[targetDate.day()];
  // },

  // getDuration(date1, date2){
  //     var m1 = moment(date1).startOf('d'),
  //         m2 = moment(date2).startOf('d');
  //     return m2.diff(m1, 'd');
  // },

  hotelGradeFilter: grade => GRADE_SHORT_LABEL[grade],

  getPriceItem(price) {
    if (price) {
      return FILTER_SETTING.price.options.find(item => {
        if (parseInt(price, 10) === item.value) {
          return true;
        }
      });
    }
  },

  formatPriceGradeFilter(price, grade) {
    var reslut = [];

    if (price) {
      FILTER_SETTING.price.options.some(item => {
        if (price === item.value) {
          reslut.push(item.text);
          return true;
        }
      });
    }

    if (grade && grade[0]) {
      FILTER_SETTING.grade.options.forEach(item => {
        if (grade.indexOf(item.value) !== -1) {
          reslut.push(item.text);
        }
      });
    }

    return reslut.join(',');
  },

  serviceMapFormat(serviceMap) {
    var result = [];
    Object.values(serviceMap).forEach(serviceName => {
      if (serviceName) {
        result.push({
          icon: toKebabCase(SERVICES_MAP_VALUE_KEY[serviceName] || ''),
          name: serviceName
        });
      }
    });
    return result;
  },
  parseLocationDesc(locationData) {
    var addressDesc;
    if (locationData.poiRegions && locationData.poiRegions.length) {
      addressDesc = locationData.poiRegions[0].name;
    } else if (locationData.sematic_description) {
      addressDesc = locationData.sematic_description;
    } else {
      addressDesc = locationData.formatted_address;
    }
    return addressDesc;
  },

  GRADE_LABEL: ['', '快捷酒店', '二星/经济', '三星/舒适', '四星/高档', '五星/豪华'],

  RECORD_TYPE: ['已浏览', '已收藏', '同事入住', '历史入住'],

  LOCATIONS: [
    // {
    //     name: '行政区',
    //     type: 1,
    //     done: true,
    //     loading: false,
    //     list: null
    // },
    {
      name: '商圈',
      type: 2,
      done: true,
      loading: false,
      list: null
    },
    {
      name: '景点',
      type: 3,
      done: true,
      loading: false,
      list: null
    },
    {
      name: '车站',
      type: 4,
      done: true,
      loading: false,
      list: null
    },
    {
      name: '地铁',
      type: 5,
      done: false,
      loading: false,
      list: null
    },
    // {
    //     name: '市辖区',
    //     type: 8,
    //     done: true,
    //     loading: false,
    //     list: null
    // },
    {
      name: '医院',
      type: 9,
      done: true,
      loading: false,
      list: null
    },
    {
      name: '学校',
      type: 10,
      done: true,
      loading: false,
      list: null
    }
  ],

  FILTER_SETTING,
  // cityCenterStorage,
  SERVICES_MAP,

  STATUS_SERVICE,

  DEFAULT_QUERY_PARAMS: {
    // cityId: 440300,
    // cityName: '深圳市',
    startDate: '',
    endDate: '',
    // duration: 0,
    keywordStr: '',
    priceSection: 0,
    grade: '0',
    priceGradeStr: '',
    lat: '',
    lng: '',
    areaStr: '',
    keywordType: 0,
    keyword: ''
  }

};


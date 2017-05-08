<template lang="pug">
  section.voyage-info.depart(:mode="mode")
    .main-block
      .depart.data-block
        .city {{airline.depCitych}}
        .time.color-1 {{airline.takeofftime && airline.takeofftime.slice(11, 16)}}
        .airport {{airline.depAirportch}}{{airline.fromterminal}}
      .progress
        .date {{airline.takeofftime && airline.takeofftime.slice(5, 10)}} {{airline.takeofftime | week-filter}} {{seatType | seat-type-filter}}
        i.icon
        span.duration {{airline.takeofftime | takes-time-filter(airline.arrivetime, 'HH小时mm分')}}
      .arrive.data-block
        .city {{airline.arrCitych}}
        .time.color-1 {{airline.arrivetime && airline.arrivetime.slice(11, 16)}}
        .airport {{airline.arrAirportch}}{{airline.arrterminal}}
    .detail
      p.flight-info
        span.flight.color-1 {{airline.carrierch}}{{airline.flightno}} 
        span.share(v-show='airline.isshare') 共享 
        span.plane | {{airline.planetype}} {{airline.airplanesize | airplanesize}}
        span.meal(v-show='airline.meal') | 提供餐食 
      .share-acture(v-show="airline.isshare")
        span.label 实际乘坐 
        span.text.color-1 {{airline.actureCarrierch}}{{airline.actureFlightno}}
</template>

<script>
  const TYPES = {
  
    1: '经济舱',
  
    2: '头等/商务舱'
  
  };
  
  export default {
  
    props: {
  
      airline: {
  
        type: Object,
  
        default: () => {}
  
      },
  
      seatType: [String, Number],
  
      mode: String
  
    },

    filters: {
  
      ['seat-type-filter'](val) {
  
        return +val ? TYPES[val] : val;
  
      }
  
    }
  
  };
</script>

<style lang="stylus" scoped>

  @import './index.styl'

</style>

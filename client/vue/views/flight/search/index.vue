<template lang="pug">
  article.page-layout
    main.page-main(data-name='flight-search')
      .flight-banner
        a.link(href='/actpage/invite-intro.html')
          img.image(src='/static/images/banners/commons/adbanner.jpg')
      .search-form
        .tab-buttons
          .button(:class='{ active: form.voyagetype === 1 }', @click='selectVoyagetype(1);') 单程
          .button(:class='{ active: form.voyagetype === 2 }', @click='selectVoyagetype(2);') 往返
        .form-main
          .row.city-row(:class='{ animate: exchange }')
            .tap-area.pl1.fl
              // .bb.pl2
              //   span.text-wrap(v-text='form.depcitycn')
              transition(name='l-2-r')
                .bb.pl2(v-show='!exchange')
                  span.text-wrap(v-if='form.depcitycn', v-text='form.depcitycn')
                  span.text-wrap.null(v-else) 出发城市
              transition(name='show-deferred')
                .bb.pl2(v-show='exchange')
                  span.text-wrap(v-if='form.depcitycn', v-text='form.depcitycn')
                  span.text-wrap.null(v-else) 出发城市
            .tap-area.pr1.fr
              // .bb.pr2.tr
              //   span.text-wrap(v-text='form.arrcitycn')
              transition(name='r-2-l')
                .bb.pr2.tr(v-show='!exchange')
                  span.text-wrap(v-if='form.arrcitycn', v-text='form.arrcitycn')
                  span.text-wrap.null(v-else) 到达城市
              transition(name='show-deferred')    
                .bb.pr2.tr(v-show='exchange')
                  span.text-wrap(v-if='form.arrcitycn', v-text='form.arrcitycn')
                  span.text-wrap.null(v-else) 到达城市   
            .switch-button(@click='exchangeCities();')
              .inner-ico
          .date-row.row.tap-area.pl1.pr1
            .bb
              .depdate.fl.pl2
                span.date {{form.depdate | date-filter('MM月DD日')}}
                span.day {{form.depdate | week-filter}}
              .returndate.fr.pr2(v-show='form.voyagetype === 2')
                span.date {{form.returndate | date-filter('MM月DD日')}}
                span.day {{form.returndate | week-filter}}
          .row
            .cabin-field.tap-area.pl1.fl
              span.text-wrap.pl2.bb(@click='$refs.$startCabinSeat.show();', :class='{ null: !seatclasstypes.value }', v-text='seatclasstypes.label')
          .button-search(@click='search();') 搜索

    //- 选择舱位
    c-select(v-model='seatclasstypes', ref='$startCabinSeat', @cancel='$refs.$startCabinSeat.hide();', @confirm='selectCabinType', heading='请选择舱位类型', :options='cabinTypes')

</template>

<script>
  import {
  
    mapState
  
  } from 'vuex';
  
  import {
  
    M_INIT_AIRLINE_PARAMS,
  
    M_UPDATE_AIRLINE_PARAMS
  
  } from '../../../stores/flight/types';
  
  export default {
  
    created() {
  
      this.$store.commit(M_INIT_AIRLINE_PARAMS);
  
      const seatclasstypes = this.form.seatclasstypes;
  
      if (seatclasstypes) {
  
        this.seatclasstypes = this.cabinTypes.find((n) => {
  
          return n.value === seatclasstypes;
  
        });
  
      } else {
  
        this.seatclasstypes = this.cabinTypes[0];
  
      }
  
    },
  
    data() {
  
      return {
  
        exchange: false, // 城市切换
  
        // 舱位类型选项
  
        cabinTypes: [{
  
          label: '舱位不限',
  
          value: ''
  
        }, {
  
          label: '经济舱',
  
          value: '7'
  
        }, {
  
          label: '头等/商务舱',
  
          value: '2,4'
  
        }],
  
        seatclasstypes: {} // 舱位类型对象
  
      };
  
    },
  
    computed: mapState({
  
      form: (state) => state.flight.airlineParams
  
    }),
  
    methods: {
  
      // 切换城市
  
      exchangeCities() {
  
        const depcitycn = this.form.depcitycn;
  
        const depcity = this.form.depcity;
  
        const form = {};
  
        form.depcitycn = this.form.arrcitycn;
  
        form.arrcitycn = depcitycn;
  
        form.depcity = this.form.arrcity;
  
        form.arrcity = depcity;
  
        this.exchange = !this.exchange;
  
        this.$store.commit(M_UPDATE_AIRLINE_PARAMS, form);
  
      },
  
      // 搜索
  
      search() {
  
      },

      // 请选择舱位类型
  
      selectCabinType(item) {
  
        this.$refs.$startCabinSeat.hide();
  
        this.$store.commit(M_UPDATE_AIRLINE_PARAMS, {
  
          queryBySeatClass: !!item.value,
  
          seatclasstypes: item.value
  
        });
  
      },

      // 请选择往返程
  
      selectVoyagetype(val) {
  
        this.$store.commit(M_UPDATE_AIRLINE_PARAMS, {
  
          voyagetype: val,
  
          isReturn: val === 2
  
        });
  
      }
  
    }
  
  };

</script>

<style lang='stylus' scoped>
  @import './index.styl';
</style>

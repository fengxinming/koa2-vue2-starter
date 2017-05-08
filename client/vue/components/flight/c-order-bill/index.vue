<template lang="pug">

  mt-popup(v-model="visible", popup-transition='popup-fade', data-popup='c-order-bill', :modal='modal')
    .consumer(@click='hide')
      .consumer-list
        h2 费用明细
          dl.cost-list
            dt
              span 机票总价
              span.right ￥{{flight.total}}
            dd
              span 成人票
              span.right ￥{{flight.adult / flight.population}}x{{flight.population}}人
            dd
              span 机建+燃油
              span.right ￥{{flight.tips / flight.population}}x{{flight.population}}人
            //-
                template(v-if='value.childRate')
                dd
                    span 儿童票
                    span.right ￥{{value.childFavorableprice}}x{{value.tickets.length}}人
                dd
                    span 机建+燃油
                    span.right 
            dt(v-if="insurance.total")
              span 保险
              span.right ￥{{insurance.total}}
            dd(v-for='insurance in insurance.list')
              span(v-text='INSURANCE_NAME[insurance.productType]')
              span.right ￥{{insurance.price}}x{{flight.population}}份  
            template(v-if='deliveryFee')
              dt
                span 配送费
                span.right ￥{{deliveryFee}}
              dd
                span 发票配送费
                span.right ￥{{deliveryFee}}
            dt
              span 实际付款
              span &nbsp;
            dd
              span(v-if="value.status === 1") 待支付
              span(v-if="value.status === 5") 未支付
                //-   span(v-if="[1,5].indexOf(value.status) === -1", v-text='value.payChannelName')
              span.right ￥{{value.amount}}

</template>
 

<script>

export default {

  name: 'c-order-bill',

  props: {

    value: Object,

    default: () => {}

  },

  data() {

    return {

      modal: false,

      visible: false,

      INSURANCE_NAME: {

        1: '航意险',

        2: '延误险'

      },

      flight: {

        total: 0,

        adult: 0,

        tips: 0,

        population: 1

      },

      insurance: {

        total: 0,

        list: []

      },

      deliveryFee: 0

    };

  },

  created() {

    if (this.value.amount) {

      this.init(this.value);

    }

  },

  watch: {

    value: 'init'

  },

  methods: {

    init(val) {

      let deliveryFee = val.invoice && val.invoice.deliveryFee || 0;

      let insurance = 0;

      const tickets = val.tickets || [];

      const population = tickets.length || 1;

      tickets.forEach((n) => {

        if (n.insurances) {

          n.insurances.forEach((m) => {

            insurance += m.price;

          });

          this.insurance.list = n.insurances;

        }

      });

      this.deliveryFee = deliveryFee;

      this.insurance.total = insurance;

      this.flight.total = val.amount - deliveryFee - insurance;

      this.flight.tips = val.adultRate.airportTax + val.adultRate.fuelTax;

      this.flight.adult = this.flight.total - this.flight.tips;

      this.flight.population = population;

    },

    show() {

      this.visible = true;

    },

    hide() {

      this.visible = false;

    }

  }

};
</script>

<style lang="stylus" scoped>
  @import './index.styl'
</style>

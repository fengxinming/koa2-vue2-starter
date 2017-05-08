<template lang="pug">
  mt-popup(v-model='visible', position='bottom', data-name='c-prebill')
    dl.contain(v-if='value.preorder.rates && value.preorder.rates.length')
      dt.title 
        span.label(v-if="value.preorder.rates.length > 1") 去程
        span.flight-info {{value.preorder.rates[0].flight.flightNo}}{{value.preorder.rates[0].cabin.seatType}}
      dd.section
        div.row
          div.label 成人票
          div.price ￥{{value.totalPrice | count-total-price(value.preorder, value.insurances)}} 
          div.count x{{value.passengers.length}}人
        div.row
          div.label 机建+燃油
          div.price ￥{{value.preorder.rates[0].adultPrice.airportTax}} + ￥{{value.preorder.rates[0].adultPrice.fuelTax}}
          div.count x{{value.passengers.length}}人

      //-
        template(v-if="childEnable && childTicketData.count && childTicketData.depart")
          dd.section
            div.row
              div.label 儿童票
              div.price ￥{{childTicketData.depart.zizPrice}} 
              div.count x{{childTicketData.count}}人
            div.row
              div.label 机建+燃油
              div.price ￥{{childTicketData.depart.airportTax}} + ￥{{childTicketData.depart.fuelTax}}
              div.count x{{childTicketData.count}}人

      template(v-if="value.preorder.rates.length > 1")
        dt.title
          span.label 返程
          span.flight-info {{value.preorder.rates[1].flight.flightNo}}{{value.preorder.rates[1].cabin.seatType}}
        dd.section
          div.row
            div.label 成人票
            div.price ￥{{value.preorder.rates[1].adultPrice.salePrice}} 
            div.count x{{value.passengers.length}}人
          div.row
            div.label 机建+燃油
            div.price ￥{{value.preorder.rates[1].adultPrice.airportTax}} + ￥{{value.preorder.rates[1].adultPrice.fuelTax}}
            div.count x{{value.passengers.length}}人

      //-   
        template(v-if="childEnable && childTicketData.count && childTicketData.return")
          dd.section
            div.row
              div.label 儿童票
              div.price ￥{{childTicketData.return.zizPrice}} 
              div.count x{{childTicketData.count}}人
            div.row
              div.label 机建+燃油
              div.price ￥{{childTicketData.return.airportTax}} + ￥{{childTicketData.return.fuelTax}}
              div.count x{{childTicketData.count}}人

      template(v-if="value.insurances && value.insurances.length")
        dd.section
          .row(v-for='insurance in value.insurances')
            .label(v-text='insurance.name')
            div.price ￥{{insurance.price}} 
            div.count x{{value.preorder.rates.length * value.passengers.length}}份

      //-
        template(v-if="invoice.required !== false")
          dd.section
            div.row
              div.label 配送费
              div.price {{distributionFee}}
              div.count x1份
</template>

<script>
  export default {
  
    name: 'c-prebill',
  
    props: {
  
      value: Object
  
    },
  
    data() {
  
      return {
  
        visible: false
  
      };
  
    },
  
    methods: {
  
      show() {
  
        this.visible = true;
  
      },
  
      hide() {
  
        this.visible = false;
  
      }
  
    },
  
    filters: {
  
      ['count-total-price'](val, preorder, insurances) {
  
        if (val) {
  
          val -= (preorder.rates.length > 1 ? preorder.rates.reduce((a, b) => {
  
            return a.adultPrice.airportTax + a.adultPrice.fuelTax + b.adultPrice.airportTax + b.adultPrice.fuelTax;
  
          }) : preorder.rates[0].adultPrice.airportTax + preorder.rates[0].adultPrice.fuelTax) + (insurances.length > 1 ? insurances.reduce((a, b) => {
  
            return a.price + b.price;
  
          }) : insurances[0].price);
  
          return val;
  
        }
  
        return val;
  
      }
  
    }
  
  };
</script>

<style lang='stylus'>
  @import './index.styl';
</style>

<template lang="pug">
    mt-popup(v-model='visible', position='bottom', data-name='charge-detail')
        .order-charge-detail#order-charge-detail
            .container
                h2.title 费用明细
                dl.section
                    dt.head
                        span.label {{roomInfo.name}} - {{roomInfo.policyName}}
                        span.amount &yen;{{orderParams.totalPrice}}
                    dd.content
                        .row(v-for="item in orderParams.roomChargesList")
                            .label {{item.time}}
                            .price &yen;{{item.price}}x{{orderParams.roomNum}}间

                dl.section(v-if="orderParams.invoiceRequired")
                    dt.head
                        span.label 配送费
                        span.amount &yen;10
                    dd.content
                        span.label 快递
                        span.price &yen;10

                dl.section(v-if="couponData")
                    dt.head
                        span.label 抵扣券
                        span.amount &yen;{{couponData.exchangeCash}}
                    dd.content
                        span.label {{couponData.couponName}}
                        span.price &yen;{{couponData.exchangeCash}}x1张

                dl.section
                    dt.head
                        span.label 实际付款
                    dd.content
                        span.label &nbsp;
                        span.price &yen;{{orderParams.totalPrice}}
</template>

<script>
    const CHANNEL_TYPE = {
      '7': '微信支付',
      '12': '月结付款'
    };
    export default {
      name: 'c-charge-detail',
      props: {
        roomInfo: {
          type: Object
        },
        orderParams: {
          type: Object
        },
        couponData: {
          type: Object
        },
        payChannel: {
          type: [Number, String]
        }
      },
      data() {
        return {
          visible: false
        };
      },
      methods: {
        show() {
          this.visible = true;
        }
      },
      filters: {
        payChannelFilter(payChannel) {
          return CHANNEL_TYPE[payChannel];
        }
      }
    };
</script>

<style lang='stylus' scoped>
  @import './index.styl';
</style>

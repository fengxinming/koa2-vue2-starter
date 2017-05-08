<template lang="pug">

  mt-popup(v-model="visible", popup-transition='popup-fade', data-name='booking-notes-popup')
    .container
        h2.title
            i.split-before
            span.title-main 机票预订须知
            i.split-after
        .content
            p.paragraph 因航空公司政策规定，为防止不正当占用航班座位，预订机票时请遵守下面规定：
            ul.rules
                li.item 1.每个用户待支付订单不能超过4个
                li.item 2.每位用户，每天取消的机票不能超过10个（包括超时取消的订单和用户主动取消的订单）

</template>
 

<script>
  export default {

    name: 'c-booking-notes',

    data() {

      return {

        visible: false

      };

    },

    methods: {

      show() {

        this.visible = true;

      }

    }

  };
</script>

<style lang="stylus" scoped>
  @import './index.styl'
</style>

<template lang="pug">
  //- 机票详情  
  mt-popup(v-model="visible", popup-transition='popup-fade', data-name='airline-popup', v-if='cabins && cabins.length > 0')
    c-airline-part(v-for='(ca, index) in cabins', :airline='ca', :seat-type='ca.cabin.seatType', :mode='index ? "return" : "depart"', theme='white', popup)
</template>

<script>

  import cAirlinePart from './index.vue';

  export default {

    props: {
      cabins: {
        type: Array,
        default: ()=> []
      }
    },

    data() {
      return {
        visible: false
      };
    },

    components: {
      cAirlinePart
    },

    methods: {
      show() {
        this.visible = true;
      }
    }

  };

</script>

<style lang="stylus" scoped>

  // 弹窗飞机信息
  .mint-popup[data-name='airline-popup']
      width: px2rem(690px)
      background-color: transparent
      display: block
      overflow: hidden
      border-radius: px2rem(24px)

</style>

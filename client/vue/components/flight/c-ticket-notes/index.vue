<template lang="pug">
mt-popup(v-model="visible", popup-transition='popup-fade', data-popup='c-ticket-notes')
  div.container
    h2.title 取票说明
    p.content
      | 乘机当天直接前往机场，凭购票时所登记的证件，在机票所属航空公司柜台或自助值机柜台即可办理登记牌乘机，有行李托运的乘客建议直接在航空公司柜台办理。
</template>
 

<script>

  export default {
    name: 'c-ticket-notes',
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

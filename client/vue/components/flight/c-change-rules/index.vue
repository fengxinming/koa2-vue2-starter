<template lang="pug">

mt-popup(v-model="visible", popup-transition='popup-fade', data-name='airline-change-rules-popup')
  div.container(v-if="tiketRuleInfo")
    h2.title 退改签规则
    dl.content
      dt.subtitle(v-show="tiketRuleInfo[1]") 去程退改签规则
      dd.rules
        h3.label
          span 退票费
          small (退票时扣除的手续费)
        p.text {{tiketRuleInfo[0].refundRule | airline-rule-filter(channelType[0]) }}
        h3.label 转签条件
        p.text {{tiketRuleInfo[0].flightRule | airline-rule-filter(channelType[0]) }}
        h3.label 同舱改期费
        p.text {{tiketRuleInfo[0].modifyRule | airline-rule-filter(channelType[0]) }}
      template(v-if="tiketRuleInfo[1]")
        dt.subtitle 返程退改签规则
        dl.rules
          h3.label
            span 退票费
            small (退票时扣除的手续费)
          p.text {{tiketRuleInfo[1].refundRule | airline-rule-filter(channelType[1]) }}
          h3.label 转签条件
          p.text {{tiketRuleInfo[1].flightRule | airline-rule-filter(channelType[1]) }}
          h3.label 同舱改期费
          p.text {{tiketRuleInfo[1].modifyRule | airline-rule-filter(channelType[1]) }}

</template>

<script>
  //   import utils from '../../../commons/processing';

  export default {
  
    name: 'c-change-rules',
  
    data() {
  
      return {
  
        tiketRuleInfo: null,
  
        channelType: null,
  
        visible: false
  
      };
  
    },

    methods: {
  
      show(tiketRuleInfo, channelType) {
  
        this.channelType = channelType;
  
        this.tiketRuleInfo = tiketRuleInfo;
  
        this.visible = true;
  
      }
  
    }
  
  };
</script>

<style lang="stylus" scoped>
  @import './index.styl'
</style>

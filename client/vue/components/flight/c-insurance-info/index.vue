<template lang="pug">

mt-popup(v-model="visible", popup-transition='popup-fade', data-name='insurance-info-popup')
  div.container(v-if="focusInsuranceData")
    h1.title {{focusInsuranceData.name}}
    main.main-content
      section
        h2.section-title 基本信息
        table.content
          tbody
            tr
              td.label 保险公司
              td.info {{focusInsuranceData.insuranceCompany}}
            tr
              td.label 保险范围
              td.info {{focusInsuranceData.scope}}
            tr
              td.label 保障期限
              td.info {{focusInsuranceData.period}}
            tr
              td.label 份数限制
              td.info {{focusInsuranceData.restrictions}}份/每人
            tr
              td.label 保障方案
              td.info {{focusInsuranceData.ensuredProject}}
            tr
              td.label 保险费用
              td.info {{focusInsuranceData.denomination}}
            tr
              td.label 报销凭证
              td.info {{focusInsuranceData.certificateType}}
            tr
              td.label 受益人
              td.info {{focusInsuranceData.favoree}}
      section
        h2.section-title 保单详情
        div.content
          img(v-bind:src = "focusInsuranceData.detail").insurance-detail
      section
        h2.section-title 特殊说明
        ul.remarks.content
          li(v-for="info in (focusInsuranceData.remark||'').split(/\\n/)", v-text='info')

      section
        h2.section-title 理赔信息
        p.claims.content {{focusInsuranceData.claims}}
      section
        h2.section-title 相关咨询
        p.refer.content {{focusInsuranceData.refer}}


</template>
 

<script>
  export default {
  
    name: 'c-insurance-info',
  
    data() {
  
      return {
  
        focusInsuranceData: null,
  
        visible: false
  
      };
  
    },
  
    methods: {
  
      show(focusInsuranceData) {
  
        this.focusInsuranceData = focusInsuranceData;
  
        this.visible = true;
  
      }
  
    }
  
  };
</script>

<style lang="stylus" scoped>
  @import './index.styl'
</style>

<template lang="pug">
    mt-popup(v-model="visible", popup-transition='popup-fade', data-name='reason-for-noapply')
        #mismatch-reason
            div.container
                h2.title 您预订的行程没有在出差申请中显示，可能原因如下：
                dl.reason
                    dt.label 城市匹配失败
                    dd.content 您预订的酒店不在您申请的 [ 出差城市 ] 中
                    dt.label 时间匹配失败
                    dd.content 您选择的入离时间不在您申请的 [ 出差时间 ] 内
</template>

<script>
    export default{
      name: 'c-reason-noapply',
      created() {},
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
      }
    };
</script>

<style lang="stylus" scoped>
  @import './index.styl'
</style>

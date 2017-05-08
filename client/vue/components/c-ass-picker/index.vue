<template lang="pug">
  mt-popup(v-model='visible', :position='position', :picker-name='pickerName')
    .c-ass-picker
      .c-ass-picker-header
        input(type='button', :value='confirmButtonText', @click='$emit("confirm")').c-ass-picker-button.confirm
        input(type='button', :value='cancelButtonText', @click='$emit("cancel")').c-ass-picker-button.cancel
        h2.c-ass-picker-title(v-text='heading')
      .c-ass-picker-main
        slot
</template>

<script>
  export default {
    name: 'c-ass-picker',
    props: {
      heading: String,
      cancelButtonText: {
        type: String,
        default: '取消'
      },
      confirmButtonText: {
        type: String,
        default: '确认'
      },
      position: {
        type: String,
        default: 'bottom'
      },
      pickerName: {
        type: String,
        default: 'c-ass-picker'
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
      },
      hide() {
        this.visible = false;
      }
    }
  };
</script>

<style lang="stylus">
  @import './index.styl';
</style>

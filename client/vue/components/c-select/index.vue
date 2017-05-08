<template lang="pug">
  c-ass-picker(
    ref='$cAssPicker', 
    :confirm-button-text='confirmButtonText', 
    :cancel-button-text='cancelButtonText', 
    :heading='heading', 
    @cancel='hide', 
    @confirm='confirm'
  )
    dl.c-select-options
      dd(v-for='item in options', v-text='item[optionLabel]', @click='select(item);', :class='{ checked: selectedItem && selectedItem[optionValue] === item[optionValue] }')
</template>

<script>
  import cAssPicker from '../c-ass-picker';
  
  export default {
  
    name: 'c-select',
  
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
  
      options: {
  
        type: Array,
  
        default: []
  
      },
  
      optionValue: {
  
        type: String,
  
        default: 'value'
  
      },
  
      optionLabel: {
  
        type: String,
  
        default: 'label'
  
      },
  
      position: {
  
        type: String,
  
        default: 'bottom'
  
      },
  
      value: Object
  
    },
  
    data() {
  
      const value = this.value;
  
      const selectedItem = value ? Object.assign({}, value) : {};
  
      return {
  
        selectedItem: selectedItem,
  
        visible: false
  
      };
  
    },
  
    watch: {
  
      value(val) {
  
        const value = Object.assign({}, val);
  
        this.selectedItem = value;
  
      }
  
    },
  
    methods: {
  
      show() {
  
        this.$refs.$cAssPicker.show();
  
      },
  
      hide() {
  
        this.$refs.$cAssPicker.hide();
  
      },
  
      updateModel(val) {
  
        this.$emit('input', val);
  
      },
  
      select(item) {
  
        this.selectedItem = item;
  
      },
  
      confirm() {
  
        const currentValue = Object.assign({}, this.selectedItem);
  
        this.updateModel(currentValue);
  
        this.$emit('confirm', currentValue);
  
      }
  
    },
  
    components: {
  
      cAssPicker
  
    }
  
  };
</script>

<style lang='stylus' scoped>
  @import './index.styl';
</style>

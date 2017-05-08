<template lang="pug">
  c-ass-picker(ref='$cAssPicker', @cancel='hide', @confirm='confirm')
    mt-picker(
      ref='$mtPicker',
      v-if='addressSlots[0].values.length',
      :slots="addressSlots",
      @change="onAddressChange",
      value-key='label',
      :visible-item-count="5",
      :item-height='itemHeight',
      :rotate-effect='rotateEffect'
    )
</template>

<script>
  import cAssPicker from '../c-ass-picker';
  
  import mtPicker from 'mint-ui/lib/picker';
  
  import store from './store';
  
  const flexible = window.lib.flexible;
  
  export default {
  
    name: 'c-city-picker',
  
    // props: {
  
    //   heading: String,
  
    //   cancelButtonText: {
  
    //     type: String,
  
    //     default: '取消'
  
    //   },
  
    //   confirmButtonText: {
  
    //     type: String,
  
    //     default: '确认'
  
    //   },
  
    //   position: {
  
    //     type: String,
  
    //     default: 'bottom'
  
    //   },
  
    //   value: Object
  
    // },
  
    data() {
  
      const me = this;
  
      store().then((addr) => {
  
        me.addressSlots[0].values = addr;
  
        me.addressSlots[2].values = addr[0].children;
  
      });
  
      return {
  
        addressSlots: [{
  
          flex: 1,
  
          values: [],
  
          // className: 'slot1',
  
          textAlign: 'center'
  
        }, {
  
          divider: true,
  
          content: '-',
  
          className: 'slot2'
  
        }, {
  
          flex: 1,
  
          values: [],
  
          // className: 'slot3',
  
          textAlign: 'center'
  
        }]
  
      };
  
    },
  
    watch: {
  
    },

    computed: {

      itemHeight() {

        return flexible.rem2px(1);

      },

      rotateEffect() {

        return true;

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
  
      onAddressChange(picker, values) {
  
        const province = values[0];
  
        if (province) {
  
          picker.setSlotValues(1, province.children);
  
        }
  
      },
  
      confirm() {
  
        let currentValue = this.$refs.$mtPicker.getValues().slice(0);
  
        if (!currentValue[0]) {
  
          currentValue[0] = this.addressSlots[0].values[0];
  
        }
  
        currentValue.map((n) => {
  
          // return Object.assign({}, n);
  
          return {
  
            label: n.label,
  
            value: n.value
  
          };
  
        });
  
        this.updateModel(currentValue);
  
        this.$emit('confirm', currentValue);
  
      },
  
      reset() {
  
        this.$refs.$mtPicker.setSlotValue(0, this.addressSlots[0].values[0]);
  
      }
  
    },
  
    components: {
  
      cAssPicker,
  
      mtPicker
  
    }
  
  };
</script>

<style lang="stylus">
  .slot2          
    font-weight: 900
</style>

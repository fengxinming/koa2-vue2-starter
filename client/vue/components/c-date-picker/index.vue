<template lang="pug">
  c-ass-picker(ref='$cAssPicker', @cancel='hide', @confirm='confirm')
    mt-picker(
      ref='$mtPicker',
      :slots="addressSlots",
      @change="onDateChange",
      :visible-item-count="5",
      :item-height='itemHeight'
    )
</template>

<script>
  import cAssPicker from '../c-ass-picker';
  
  import mtPicker from 'mint-ui/lib/picker';

  import util from '../../commons/processing';

  import moment from 'moment';
  
  const flexible = window.lib.flexible;
  
  export default {
  
    name: 'c-date-picker',

    props: {
  
      value: String,

      defaultValue: String,

      formatter: {

        type: String,

        default: 'YYYY-MM-DD'

      }
  
    },
  
    data() {

      const arr = this.init(this.value);

      const slots = [{
  
        flex: 1,

        values: arr[0],

        textAlign: 'center'

      }, {

        flex: 1,

        values: arr[1],

        textAlign: 'center'

      }, {

        flex: 1,

        values: arr[2],

        textAlign: 'center'

      }];

      const indexes = this.getDefaultIndexes(this.value, slots);

      slots.forEach((n, i)=> {

        n.defaultIndex = indexes[i];

      });
  
      return {
  
        addressSlots: slots
  
      };
  
    },
  
    watch: {

      value(val) {

        this.reset(val);

      }
  
    },

    computed: {

      itemHeight() {

        return flexible.rem2px(1);

      }

    },
  
    methods: {

      // 初始化日期控件

      init(newDate) {

        const currentDate = new Date();

        let currentYear = currentDate.getFullYear();

        const arrYear = [];

        for (let i = currentYear - 100; i <= currentYear; i++) {

          arrYear[arrYear.length] = i;

        }

        const arrMonth = [];

        for (let i = 1; i <= 12; i++) {

          arrMonth[i - 1] = i;

        }

        let currentMonth;

        if (newDate) {

          newDate = moment(newDate, this.formatter);

          currentYear = newDate.year();

          currentMonth = newDate.month() + 1;

        } else {

          currentYear = arrYear[0];

          currentMonth = arrMonth[0];

        }

        return [arrYear, arrMonth, this.getDays(currentYear, currentMonth)];

      },

      getDays(currentYear, currentMonth) {

        const arrDay = [];

        for (let i = 1, j = util.daysInMonth(currentYear, currentMonth); i <= j; i++) {

          arrDay[i - 1] = i;

        }

        return arrDay;

      },

      // 初始化默认值

      getDefaultIndexes(val, slots) {

        val = val || this.defaultValue;

        if (!val) {

          return [0, 0, 0];

        }

        if (!Array.isArray(val)) {

          val = moment(val, this.formatter);

          val = [val.year(), val.month() + 1, val.date()];

        }

        slots = slots || this.addressSlots;

        return slots.map((n, i)=> {

          return n.values.indexOf(val[i]);

        });

      },
  
      show() {
  
        this.$refs.$cAssPicker.show();
  
      },
  
      hide() {
  
        this.$refs.$cAssPicker.hide();
  
      },
  
      updateModel(val) {
  
        this.$emit('input', val);
  
      },
  
      onDateChange(picker, values) {

        if (values[0] && values[1] && values[2]) {

          const months = this.addressSlots[1].values;

          picker.setSlotValues(1, months);

          picker.setSlotValues(2, this.getDays(values[0], values[1] - 1));

        }
  
      },
  
      confirm() {
  
        let currentValue = this.$refs.$mtPicker.getValues();

        currentValue = moment([currentValue[0], currentValue[1] - 1, currentValue[2]]).format(this.formatter);
  
        this.updateModel(currentValue);
  
        this.$emit('confirm', currentValue);
  
      },
  
      reset(val) {

        val = val || this.defaultValue;

        const $picker = this.$refs.$mtPicker;

        let year = this.addressSlots[0].values[0];

        let month = 0;

        let date = 1;

        if (val) {

          const $date = moment(val, this.formatter);

          year = $date.year();

          month = $date.month();

          date = $date.date();

        }

        $picker.setSlotValues(2, this.getDays(year, month, date));

        $picker.setValues([year, month + 1, date]);
  
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

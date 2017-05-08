<template lang="pug">
  .c-huge-datepicker
    .c-huge-datepicker-header
      .c-huge-datepicker-datebar
        .c-huge-datepicker-datebox.pull-right(v-if='(multiple + "") === "true"')
          span.c-huge-datepicker-datebox-year(v-text='selectedList[1] && selectedList[1].slice(0, 4)')
          span.c-huge-datepicker-datebox-month-date(v-text='selectedList[1] && selectedList[1].slice(5, 11)')
          span.c-huge-datepicker-datebox-label {{labelRight}}
        .c-huge-datepicker-datebox.pull-left
          span.c-huge-datepicker-datebox-year(v-text='selectedList[0] && selectedList[0].slice(0, 4)')
          span.c-huge-datepicker-datebox-month-date(v-text='selectedList[0] && selectedList[0].slice(5, 11)')
          span.c-huge-datepicker-datebox-label {{labelLeft}}
        .c-huge-datepicker-datebox-separator

      ul.c-huge-datepicker-weekbox.clearfix
        each week in ['日','一','二','三','四','五','六']
          li #{week}
          
    .c-huge-datepicker-main
      dl.c-huge-datepicker-main-calendar.clearfix(v-for='(calendar, i) in calendars')
        dt {{MONTH_LABEL[calendar.month]}}月
        dd(v-for='(date, j) in calendar.calendar', :class='{ disabled: date.disabled, selected: match(date.datetime) }', @click='select(date)')
          em(v-text='date.date')
        
</template>

<script>
  import moment from 'moment';
  
  import {
  
    mapState
  
  } from 'vuex';
  
  import {
  
    M_INIT_CALENDAR,
  
    store
  
  } from './store';
  
  export default {
  
    name: 'c-huge-datepicker',
  
    props: {
  
      multiple: {
  
        type: [String, Boolean],
  
        default: false
  
      },
  
      duration: {
  
        type: [String, Number],
  
        default: 3
  
      },
  
      disabledDate: {
  
        type: Function,
  
        default: () => {}
  
      },
  
      value: {
  
        type: Array,
  
        default: []
  
      },
  
      labelLeft: {
  
        type: String,
  
        default: '出发'
  
      },
  
      labelRight: {
  
        type: String,
  
        default: '返程'
  
      }
  
    },
  
    data() {
  
      this.$store.commit(M_INIT_CALENDAR, this);
  
      return {
  
        MONTH_LABEL: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
  
        selectedList: this.value || []
  
      };
  
    },
  
    watch: {
  
      value(val) {
  
        this.selectedList = val;
  
      }
  
    },
  
    store,
  
    computed: mapState(['calendars']),
  
    methods: {
  
      updateModel(val) {
  
        this.$emit('input', val);
  
      },
  
      match(datetime) {
  
        if (String(this.multiple) === 'true') {
  
          if (!datetime) {
  
            return false;
  
          }
  
          switch (this.selectedList.length) {
  
            case 2:
  
              const mdate = moment(datetime);
  
              return mdate.isSameOrAfter(this.selectedList[0]) && mdate.isSameOrBefore(this.selectedList[1]);
  
            case 1:
  
              return datetime === this.selectedList[0];
  
            case 0:
  
              return false;
  
          }
  
        } else {
  
          return this.selectedList.indexOf(datetime) > -1;
  
        }
  
      },
  
      select(date) {
  
        if (date.disabled) {
  
          return false;
  
        }
  
        if (String(this.multiple) === 'true') {
  
          // 多选
  
          switch (this.selectedList.length) {
  
            case 2:
  
              this.selectedList = [date.datetime];
  
              return false;
  
            case 1:
  
              if (this.selectedList[0] === date.datetime) {
  
                this.selectedList = [];
  
              } else {
  
                this.selectedList[moment(date.datetime).isBefore(this.selectedList[0]) ? 'unshift' : 'push'](date.datetime);
  
              }
  
              break;
  
            case 0:
  
              this.selectedList.push(date.datetime);
  
              break;
  
          }
  
        } else {
  
          // 单选
  
          // if(this.selectedList[0] === date.datetime) {
  
          //   this.selectedList.pop(date.datetime);
  
          //   return false;
  
          // }
  
          this.selectedList = [date.datetime];
  
        }
  
        this.updateModel(this.selectedList);
  
      }
  
    }
  
  };
</script>

<style lang='stylus'>
  @import './index.styl';
</style>

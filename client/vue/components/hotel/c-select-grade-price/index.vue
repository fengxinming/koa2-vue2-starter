<template lang='pug'>
// mt-popup(v-model='visible', :position='position', data-name='c-select-grade-price')
.filter-container
  dl.price.section
    dt.title 价格（单选）
    dl.options
      .item(v-for='item in priceSetting.options',@click='selectPrice(item.value)',:class='{active:priceSection==item.value}') {{item.text}}
  dl.level.section
    dt.title 星级（复选）
    dl.options
      .item(v-for='item in gradeSetting.options',@click='selectGrade(item.value)',:class='{active:grade.indexOf(item.value)!==-1}') {{item.text}}
  button.confirm(@click='$emit("click-confirm")') 确定
</template>

<script>
  import hotelUtils from '../../../commons/hotel-utils.js';

  export default {
    name: 'c-select-grade-price',
    props: {
      confirmButton: {
        type: String,
        default: '确认'
      },
      // - position:{
      // -   type: String,
      // -   default: 'bottom'
      // - },
      value: Object

    },
    data() {
      return {
        priceSetting: hotelUtils.FILTER_SETTING.price,
        gradeSetting: hotelUtils.FILTER_SETTING.grade,
        priceSection: 0,
        grade: ''
        // visible:false
      };
    },
    watch: {
      priceSection(val) {
        this.value.priceSection = val;
      },
      grade(val) {
        this.value.grade = val;
      }
    },
    methods: {
      // show() {
      //   this.visible = true;
      // },
      // hide() {
      //   this.visible = false;
      // },
      selectPrice(val) {
        this.priceSection = val;
      },
      selectGrade(val) {
        let gradeArr = this.grade.split(',');
        let selectedLength = gradeArr.length;
        let curIndex = this.grade.indexOf(val);
        let curActive = curIndex !== -1;
        let allLevelLength = 6;
        if (curActive) {
          // 取消选中
          if (selectedLength === 1) {
            return false;
          } else {
            gradeArr = gradeArr.filter((n) => {
              return +n !== val;
            });
            this.grade = gradeArr.join(',');
          }
        } else {
          // 选中
          if (val === 0) {// 选中“不限”
            gradeArr = [0];
            this.grade = gradeArr.join(',');
          } else {// 选中其他字段
            if (selectedLength === 1 && +gradeArr[0] === 0) {
              gradeArr = [val];
              this.grade = gradeArr.join(',');
            } else if (selectedLength + 1 === allLevelLength - 1) {
              gradeArr = [0];
              this.grade = gradeArr.join(',');
            } else {
              gradeArr.push(val);
              this.grade = gradeArr.join(',');
            }
          }
        }
      }
    },
    created() {
      this.priceSection = this.value.priceSection;
      this.grade = this.value.grade;
    }
  };
</script>

<style lang='stylus'>
  @import './index.styl';
</style>

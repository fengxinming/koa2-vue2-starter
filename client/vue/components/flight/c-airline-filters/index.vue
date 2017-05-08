<template lang='pug'>
  mt-popup(v-model='visible', :position='position', data-name='c-airline-filters')
    .c-airline-filters
      .c-airline-filters-header
        input(type='button', :value='confirmButtonText', @click='confirm').c-select-button.pull-right
        input(type='button', :value='cancelButtonText', @click='visible=false').c-select-button.pull-left
        input(type='button', :value='resetButtonText', @click='reset').c-select-button
      .c-airline-filters-main
        ul.c-airline-filters-tabs
          li(v-for='option in options', v-text='option.label', @click='active = option.name', :class='{ active: option.name === active }')
        ul.c-airline-filters-options(v-show='option.name === active', v-for='option in options')
          li(v-for='opt in option.options', v-text='opt.label', @click='select(option, opt)', :class='{ checked: (selectedItems[option.name]||[]).indexOf(opt) > -1 }')
</template>

<script>
  export default {
  
    name: 'c-airline-filters',
  
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
  
      resetButtonText: {
  
        type: String,
  
        default: '重置'
  
      },
  
      position: {
  
        type: String,
  
        default: 'bottom'
  
      },
  
      airlines: Array,
  
      value: Object
  
    },
  
    data() {
  
      return {
  
        visible: false,
  
        active: 'time',
  
        selectedItems: {},
  
        options: [{
  
          label: '起飞时段',
  
          name: 'time',
  
          options: [{
  
            label: '不限',
  
            value: '',
  
            checked: true
  
          }, {
  
            label: '上午',
  
            value: '00:00-12:00'
  
          }, {
  
            label: '下午',
  
            value: '12:00-18:00'
  
          }, {
  
            label: '晚上',
  
            value: '18:00-24:00'
  
          }]
  
        }, {
  
          label: '直飞/中转',
  
          name: 'nonstop',
  
          options: [{
  
            label: '不限',
  
            value: '',
  
            checked: true
  
          }, {
  
            label: '仅直达',
  
            value: 1
  
          }]
  
        }, {
  
          label: '舱位',
  
          name: 'cabin',
  
          options: [{
  
            label: '不限',
  
            value: '',
  
            checked: true
  
          }, {
  
            label: '经济舱',
  
            value: '7'
  
          }, {
  
            label: '头等/商务舱',
  
            value: '2,4'
  
          }]
  
        }, {
  
          label: '航空公司',
  
          name: 'airline',
  
          multiple: true,
  
          options: (() => {
  
            const map = {};
  
            this.airlines.forEach((airline) => {
  
              map[airline.carrier] = {
  
                label: airline.carrierch,
  
                value: airline.carrier
  
              };
  
            });
  
            const arr = Object.keys(map).map((key) => map[key]);
  
            // arr.unshift({
  
            //   label: '不限',
  
            //   value: '',
  
            //   checked: true
  
            // });
  
            return arr;
  
          })()
  
        }]
  
      };
  
    },
  
    created() {
  
      this.init();
  
    },
  
    watch: {},
  
    methods: {
  
      show() {
  
        this.visible = true;
  
      },
  
      hide() {
  
        this.visible = false;
  
      },
  
      updateModel(val) {
  
        this.$emit('input', val);
  
      },
  
      select(parent, item) {
  
        const selectedItems = this.selectedItems;
  
        let arr = selectedItems[parent.name];
  
        if (parent.multiple) {
  
          const index = arr.indexOf(item);
  
          if (index > -1) {
  
            arr.splice(index, 1);
  
          } else {
  
            arr.push(item);
  
          }
  
        } else {
  
          arr.splice(0, 1, item);
  
        }
  
      },
  
      confirm() {
  
        // 确保当前对象不要跟state建立绑定关系
  
        const filters = {};
  
        const selectedItems = this.selectedItems;
  
        Object.keys(selectedItems).forEach((key) => {
  
          const param = selectedItems[key];
  
          if (param.length && param[0].value) {
  
            filters[key] = param.slice(0);
  
          }
  
        });
  
        // this.updateModel(this.selectedItems);
  
        this.$emit('confirm', Object.assign({}, filters));
  
      },
  
      init() {
  
        const defaults = this.value;
  
        const selectedItems = this.selectedItems;
  
        this.options.forEach((option) => {
  
          const name = option.name;
  
          if (Array.isArray(defaults[name])) {
  
            defaults[name].forEach((n) => {
  
              for (let opt of option.options) {
  
                if (n.value === opt.value) {
  
                  if (!Array.isArray(selectedItems[name])) {
  
                    this.$set(selectedItems, name, [opt]);
  
                  } else {
  
                    selectedItems[name].push(opt);
  
                  }
  
                  break;
  
                }
  
              }
  
            });
  
          } else {
  
            const name = option.name;
  
            if (Array.isArray(selectedItems[name])) {
  
              selectedItems[name] = [];
  
            } else {
  
              this.$set(selectedItems, name, []);
  
            }
  
            option.options.forEach((n) => {
  
              if (n.checked) {
  
                selectedItems[name].push(n);
  
              }
  
            });
  
          }
  
        });
  
      },
  
      reset() {
  
        const selectedItems = this.selectedItems;
  
        this.options.forEach((option) => {
  
          const name = option.name;
  
          if (Array.isArray(selectedItems[name])) {
  
            selectedItems[name] = [];
  
          } else {
  
            this.$set(selectedItems, name, []);
  
          }
  
          option.options.forEach((n) => {
  
            if (n.checked) {
  
              selectedItems[name].push(n);
  
            }
  
          });
  
        });
  
      }
  
    }
  
  };
</script>

<style lang='stylus'>
  @import './index.styl';
</style>

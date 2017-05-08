<template lang="pug">
  .c-huge-citypicker

    .c-huge-citypicker-header
      form(action='javascript:;', onsubmit='return false;').c-huge-citypicker-searchbox
        .c-huge-citypicker-search(v-pre)
        input.c-huge-citypicker-textfield(type='text', placeholder='城市名', v-model.trim='keyword')
        .c-huge-citypicker-cleaner(v-show='keyword')

    .c-huge-citypicker-main(v-if='!keyword')
      .geo-button(v-if='false')
        span(v-if='address') 当前位置：{{address}}
        span(v-else) 点击定位图标获取当前位置

      dl.c-huge-citypicker-section.clearfix(data-type='inline',v-if='!!cities.travelApplyCities.length')
        dt.c-huge-citypicker-section-title(v-pre) 您将要出差的城市
        dd.c-huge-citypicker-section-item(v-for='city in cities.travelApplyCities', :class='{ selected: match(city) }', @click='select(city);')
          em(v-text='city.city')

      dl.c-huge-citypicker-section.clearfix(data-type='inline',v-if='!!cities.historyCities.length')
        dt.c-huge-citypicker-section-title(v-pre) 历史城市
        dd.c-huge-citypicker-section-item(v-for='city in cities.historyCities', :class='{ selected: match(city) }', @click='select(city);')
          em(v-text='city.city')

      dl.c-huge-citypicker-section.clearfix(data-type='inline',v-if='!!cities.hotCities.length')
        dt.c-huge-citypicker-section-title(v-pre) 热门城市
        dd.c-huge-citypicker-section-item(v-for='city in cities.hotCities', :class='{ selected: match(city) }', @click='select(city);')
          em(v-text='city.city')

      dl.c-huge-citypicker-section.clearfix(data-type='block', v-for='section in cities.cities')
        dt.c-huge-citypicker-section-title(:class='"title-" + section.firstLetter', v-text='section.firstLetter')
        dd.c-huge-citypicker-section-item(v-for='city in section.cityList', :class='{ selected: match(city) }', @click='select(city);')
          em(v-text='city.cityName')

      ul.c-huge-citypicker-aside
        li(v-if='false') 定位
        li(v-if='!!cities.travelApplyCities.length',:class='{nodata: !cities.travelApplyCities || !cities.travelApplyCities.length}') 出差
        li(v-if='!!cities.historyCities.length',:class='{nodata: !cities.historyCities || !cities.historyCities}') 历史
        li(v-if='!!cities.hotCities.length') 热门
        li(v-for='section in cities.cities', v-text='section.firstLetter', @click='scrollIntoView(section.firstLetter);')

      // input(type='button', value='选好了', v-if='(multiple+"") === "true"').c-huge-citypicker-confirm

      transition(name='fade', mode='out-in')
        .c-huge-citypicker-largeletter(v-show='!!letter', v-text='letter')
    .c-huge-citypicker-main(v-else)
      dl.c-huge-citypicker-section.clearfix(data-type='block', v-for='search in searchList')
          dd.c-huge-citypicker-section-item(:class='{ selected: match(search) }', @click='select(search);')
            em(v-text='search.cityName')

</template>

<script>

  import { mapState } from 'vuex';
  import { A_INIT_CITIES, store } from './store';

  export default {
    store,
    props: {
      multiple: {
        type: [String, Boolean],
        default: false
      },
      value: {
        type: [Array],
        default: []
      }
    },
    data() {
      return {
        letter: '',
        keyword: '',
        selectedList: [],
        currentValue: [],
        address: ''
      };
    },
    created() {
      if (this.value) {
        this.currentValue = this.value;
        this.selectedList = this.currentValue.slice(0);
      }
      console.log(this.currentValue);
      console.log(this.selectedList);
      this.$store.dispatch(A_INIT_CITIES);
    },
    computed: {
      ...mapState(['cities']),
      searchList() {
        const vm = this;
        return this.cities.originalData.filter(c=> {
          return c.cityName.indexOf(vm.keyword) !== -1 || c.spell.indexOf(vm.keyword) !== -1;
        });
      }
    },
    watch: {
      value(val) {
        this.currentValue = val;
        this.selectedList = this.currentValue.slice(0);
      }
    },
    methods: {
      scrollIntoView(letter) {
        const dom = document.getElementsByClassName('title-' + letter);
        if (dom && dom.length) {
          dom[0].scrollIntoView();
        }
        this.letter = letter;
        const me = this;
        setTimeout(()=> {
          me.letter = '';
        }, 1000);
      },

      match(city) {
        return this.selectedList.some((n)=> {
          return n.cityId === city.cityId;
        });
      },

      select(city) {
        if (String(this.multiple) === 'true') {
          // this.currentValue = this.selectedList = [Object.assign({}, city)];
        } else {
          this.currentValue = [this.selectedList = Object.assign({}, city)];
        }
        this.$emit('input', this.currentValue);
        this.$emit('selected', this.currentValue);
      }
    }
  };

</script>

<style lang='stylus'>
  @import './index.styl';
</style>

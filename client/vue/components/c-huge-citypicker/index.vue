<template lang="pug">
  .c-huge-citypicker

    .c-huge-citypicker-header
      form(action='javascript:;', onsubmit='return false;').c-huge-citypicker-searchbox
        .c-huge-citypicker-search(v-pre)
        input.c-huge-citypicker-textfield(type='text', placeholder='城市名', v-model.trim='keyword')
        .c-huge-citypicker-cleaner(v-show='keyword', @click='keyword="";')

    .c-huge-citypicker-main(v-if='!keyword')
      dl.c-huge-citypicker-section.clearfix(data-type='inline')
        dt.c-huge-citypicker-section-title(v-pre) 热门城市
        dd.c-huge-citypicker-section-item(v-for='city in cities.hotCities', :class='{ selected: match(city) }', @click='select(city);')
          em(v-text='city.cityName')

      dl.c-huge-citypicker-section.clearfix(data-type='block', v-for='section in cities.cities')
        dt.c-huge-citypicker-section-title(:class='"title-" + section.firstLetter', v-text='section.firstLetter')
        dd.c-huge-citypicker-section-item(v-for='city in section.cityList', :class='{ selected: match(city) }', @click='select(city);')
          em(v-text='city.cityName')

      ul.c-huge-citypicker-aside
        li(v-pre) 热门
        li(v-for='section in cities.cities', v-text='section.firstLetter', @click='scrollIntoView(section.firstLetter);')

      input(type='button', value='选好了', v-if='(multiple+"") === "true"').c-huge-citypicker-confirm
      
      transition(name='fade', mode='out-in')
        .c-huge-citypicker-largeletter(v-show='!!letter', v-text='letter')

    .c-huge-citypicker-main(v-else)
      dl.c-huge-citypicker-section.clearfix(data-type='block', v-for='section in cities.cities')
        dd.c-huge-citypicker-section-item(v-for='city in section.cityList', :class='{ selected: match(city) }', @click='select(city);')
          em(v-text='city.cityName')                                
</template>

<script>
  import {
  
    mapState
  
  } from 'vuex';
  
  import {
  
    A_INIT_CITIES,
  
    store
  
  } from './store';
  
  export default {
  
    store,
  
    props: {
  
      multiple: {
  
        type: [String, Boolean],
  
        default: false
  
      },
  
      value: {
  
        type: Array,
  
        default: []
  
      }
  
    },
  
    data() {
  
      this.$store.dispatch(A_INIT_CITIES);
  
      return {
  
        letter: '',
  
        keyword: '',
  
        selectedList: []
  
      };
  
    },
  
    created() {
  
      if (this.value) {
  
        this.selectedList = this.value.slice(0);
  
      }
  
    },
  
    computed: mapState(['cities']),
  
    watch: {
  
      value(val) {
  
        this.selectedList = val.slice(0);
  
      },
  
      keyword(val) {
  
        this.$store.dispatch(A_INIT_CITIES, {
  
          keyword: val
  
        });
  
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
  
        setTimeout(() => {
  
          me.letter = '';
  
        }, 1000);
  
      },
  
      match(city) {
  
        return this.selectedList.some((n) => {
  
          return n.airportCode === city.airportCode;
  
        });
  
      },
  
      select(city) {
  
        if (String(this.multiple) === 'true') {
  
          const index = this.selectedList.findIndex((n) => {
  
            return n.airportCode === city.airportCode;
  
          });
  
          if (index > -1) {
  
            this.selectedList.splice(index, 1);
  
          } else {
  
            this.selectedList.push(Object.assign({}, city));
  
          }
  
        } else {
  
          this.updateModel(this.selectedList = [Object.assign({}, city)]);
  
        }
  
      },
  
      updateModel(val) {
  
        this.$emit('input', val);
  
      }
  
    }
  
  };

</script>

<style lang='stylus'>
  @import './index.styl';
</style>

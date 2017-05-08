<template lang="pug">
    .keyword-page
        .keyword-header
            form.search-wrapper
                input.text-input(type='text',placeholder='酒店名/位置',v-model='keyword')
                .buttons(v-show='keyword')
                    button.btn-clean(@click.prevent='keyword=""')
                    input.btn-confirm(@click='$emit("setkeyword",keyword)',type='button',value='确认')
        .keyword-main
            section#main-block
                dl.history.section(v-if="searchHistories.length")
                    dt.head
                        .label 搜索历史
                        .action-button(v-on:click="cleanHisory") 清空
                    dd.list
                        .item(
                            v-for="item in searchHistories",
                            v-on:click="$emit('setkeyword', item)"
                        )
                            .overflow-wrap: .table-wrap: .content {{item}}
                        .item(
                            v-for= "item in historiesSurfix"
                        )

                dl.area.section(v-if="areas && areas.length")
                    dt.head
                        .label 商圈
                        //- div.action-button
                    dd.list
                        .item(
                            v-for="item in areas",
                            v-on:click="$emit('setlocation', item)"
                        )
                            .overflow-wrap: .table-wrap: .content {{item.name}}
                        .item(
                            v-for= "item in areaSurfix"
                        )

            section.search-result#search-result(v-if="false&&keyword")
                ul.search-result-list(v-if="searchResultHotel.length + searchResultLocation.length")
                    li.result-item(
                        v-for="item in searchResultHotel"
                        v-on:click="goHotel(item.id)"
                    )
                        span.text {{item.name}}
                        span.label(v-if="item.label") {{item.label}}
                    li.result-item(
                        v-for="item in searchResultLocation"
                        v-on:click="$emit('setlocation', item)"
                    )
                        span.text {{item.name}}
                        span.label(v-if="item.label") {{item.label}}
                .no-data(v-else) 没有搜索结果，换个关键词试试
</template>


<script>
    import { mapState } from 'vuex';
    import { A_INIT_AREA, store } from './store';
    export default {
      store,
      props: {
        value: [String]
      },
      data() {
        return {
          keyword: '',
          loading: true,
          searchHistories: [],
          // historiesSurfix:[],
          locations: [
            {name: '海岸城'},
            {name: '你经常多少呢接口呢'},
            {name: '南山中心区'},
            {name: '维多利亚'},
            {name: '你哈'},
            {name: '超级大，换了海岸'},
            {name: '补偿办法'}
          ],
          // areaSurfix:[],
          searchResultHotel: [
            {name: '发难分难解', label: '酒店'},
            {name: '发难分难解', label: '酒店'},
            {name: '发难分难解', label: '酒店'},
            {name: '发难分难解', label: '酒店'}
          ],
          searchResultLocation: [
            {name: '发动机解', label: '位置'},
            {name: '发难分难床单上解', label: '位置'},
            {name: '擦拭掉发发难分难解', label: '位置'}
          ]
        };
      },
      created() {
        this.keyword = this.value;
        this.$store.dispatch(A_INIT_AREA, {cityId: this.$route.query.cityId, areaType: 2});
      },
      computed: {
        activeLocation() {
          const query = this.$route.query;
          return query.lat + ',' + query.lng;
        },
        ...mapState(['areas']),
        historiesSurfix() {
          const length = (4 - (this.searchHistories.length % 4)) % 4;
          const temp = [];
          for (let i = 0; i < length; i++) {temp.push(i);}
          return temp;
        },
        areaSurfix() {
          const length = (4 - (this.locations.length % 4)) % 4;
          const temp = [];
          for (let i = 0;i < length; i++) {temp.push(i);}
          return temp;
        }
      },
      watch: {
        keyword(val) {
          this.$emit('input', val);
        }
      },
      methods: {
        cleanHisory() {},
        goHotel() {}
      }
    };

</script>
<style lang='stylus'>
  @import './index.styl';
</style>

<template lang="pug">

    a.hotel-item(@click.prevent.stop="$emit('click', item.id)")
        .wrap(v-if='item')
            .left-block
                custom-image.image(
                    :src="item.pic + '?x-oss-process=style/small'",
                    :width="'70%'"
                )

                span.label(v-if!="item.recordType!==undefined") {{item.recordType | recordTypeFilter}}
            .right-block
                h2.hotel-name {{item.name}}
                p.row.row1
                    span.item(v-show="item.businessDistrict") {{item.businessDistrict}}
                    span.item(v-show="item.grade") {{item.grade | gradeFilter}}
                    span.item {{item.decorationTime | activeFilter(item.openTime)}}
                p.row.row2(v-if="showAddress") {{item.address}}
                p.row.row2(v-else) 距离{{distanceLabel}}{{item.distance | distanceFilter}}
                .info
                    .room-type(v-show="item.roomName") {{item.roomName}}
                    .breakfast(v-if!= "item.breakfastName && item.breakfastName!=='无早'") {{item.breakfastName}}
                    .price(v-show="true||item.haveRoom")
                        span.yen &yen;
                        template(v-if="true")
                            span.num {{item.price}}
                            span.word 起
                        strong.hidden-price(v-else="")

            .full-mark(v-show="false && !item.haveRoom") 满房
</template>


<script>
  import hotelUtilService from '../../../commons/hotel-utils.js';
  export default {
    name: 'hotel-item',
    props: {
      item: {
        type: Object,
        required: true
      },
      showAddress: {
        type: Boolean,
        default: true
      },
      hidePrice: {
        type: Boolean,
        default: false
      },
      distanceLabel: {
        type: String
      }
    },
    data() {
      return {

      };
    },

    filters: {
      recordTypeFilter: recordType => hotelUtilService.RECORD_TYPE[recordType],
      gradeFilter: grade => hotelUtilService.GRADE_LABEL[grade],

      distanceFilter(distance) {
        distance = Math.round(distance);
        if (distance < 1000) {
          return distance + '米';
        } else {
          return (distance / 1000).toFixed(1) + '公里';
        }
      },

      activeFilter(decorationTime, openTime) {
        if (decorationTime) {
          return decorationTime + '年装修';
        } else if (openTime) {
          return openTime + '年开业';
        } else {
          return undefined;
        }
      }
    },

    components: {
      customImage: require('../c-custom-image')
    }
  };
</script>

<style lang='stylus' scoped>
    @import './index.styl'
</style>

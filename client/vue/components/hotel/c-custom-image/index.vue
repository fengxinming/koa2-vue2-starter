<template lang="pug">
    div.custom-image-wrapper(v-bind:status="status")
        img.inner-img(
            v-if="status === 'loading'",
            v-bind:src="loading"
        )
        img.inner-img(
            v-if="status === 'loaded'",
            v-bind:src="imageSrc"
        )
        img.inner-img(
            v-if="status === 'fall'",
            v-bind:src="imageSrc",
            v-bind:style="{width: width}"
        )
</template>



<script>

    const FALLBACK_IMG_SRC = '/static/images/commons/nopic.jpg';
    const LOADING_IMG_SRC = '/static/images/commons/loading.gif';

    const STATUS_LOADING = 'loading';
    const STATUS_FALL = 'fall';
    const STATUS_LOADED = 'loaded';

    var loadImg = src => {
      return new Promise((resolve, reject) => {
        var image = new Image();

        if (!src) {
          reject();
        }

        image.onload = () => {
          resolve(src);
          // el.setAttribute('src', src);
        };
        image.onerror = () => {
          // el.setAttribute('src', FALLBACK_IMG_SRC);
          reject();
        };
        image.src = src;
      });
    };

    loadImg(FALLBACK_IMG_SRC);
    loadImg(LOADING_IMG_SRC);

    export default {
      props: {
        fallback: {
          type: String,
          default: FALLBACK_IMG_SRC
        },
        loading: {
          type: String,
          default: LOADING_IMG_SRC
        },
        src: {
          type: String,
          required: true
        },
        width: {
          type: String
        }
      },
      data() {
        return {
          // empty
          imageSrc: null,
          status: STATUS_LOADING
        };
      },
      methods: {
        fetchImage(url) {
          return loadImg(url);
        },
        reloadImg(src) {
          var vm = this;
          vm.status = STATUS_LOADING;
          vm.fetchImage(src)
            .then(
              url => {
                vm.imageSrc = url;
                vm.status = STATUS_LOADED;
              },

              () => {
                vm.imageSrc = vm.fallback;
                vm.status = STATUS_FALL;
              }
            );
        }
      },
      watch: {
        src: 'reloadImg'
      },
      mounted() {
        this.reloadImg(this.src);
      }
    };

</script>


<style lang="stylus">

.custom-image-wrapper
    text-align: center
    overflow: hidden
    background: #fff
    text-align: center
    &::before
        content: ''
        margin-left: -1px
        height: 100%
        width: 1px
        display: inline-block
        vertical-align: middle
    .inner-img
        display: inline-block
        max-height: 100%
        max-width: 100%
        vertical-align: middle
    &[status="loaded"]
        .inner-img
            max-height: none
            max-width: none
            height: 100%
            width: 100%
    &[status="fall"]
        background: #eeeeee



</style>

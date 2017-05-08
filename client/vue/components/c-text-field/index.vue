<template lang="pug">
  .c-text-field(:class='{ "focus-state": focus, "hang-up": currentValue }')
    .c-text-field-placeholder(v-text='placeholder')
    input.c-text-field-text(v-model='currentValue', :maxlength='maxlength', @focus='onFocus', @blur='onBlur', v-if='type === "tel"', type='tel')
    input.c-text-field-text(v-model='currentValue', :maxlength='maxlength',@focus='onFocus', @blur='onBlur', v-if='type === "text"', type='text')
</template>

<script>
  export default {
    name: 'c-text-field',
    props: {
      value: [String, Object, Number],
      placeholder: String,
      maxlength: [Number, String],
      type: {
        type: String,
        default: 'text'
      }
    },
    data() {
      return {
        currentValue: this.value,
        focus: false
      };
    },
    watch: {
      currentValue(val) {
        this.$emit('input', val);
      },

      value(val) {
        this.currentValue = val;
      }
    },
    methods: {
      onFocus(evt) {
        this.focus = true;
        this.$emit('focus', evt);
      },
      onBlur(evt) {
        this.focus = false;
        this.$emit('blur', evt);
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import './index.styl'
</style>

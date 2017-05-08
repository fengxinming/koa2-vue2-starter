<template lang="pug">
    .c-list-loading
      .c-list-loading-image
      p.c-list-loading-text 请稍等，您查询的结果正在实时搜索中...
      p.c-list-loading-text2 让每一次出行都创造价值
</template>

<style lang="stylus" scoped>
  .c-list-loading
    text-align: center
    margin: auto
    padding: px2rem(60px)

    .c-list-loading-image
      background: inline-url('images/commons/waiting.gif') no-repeat center center
      background-size: contain
      width: px2rem(200px)
      height: px2rem(18px)
      margin: auto

    .c-list-loading-text
      color: #5f5f5f
      height: px2rem(60px)
      line-height: @height
    .c-list-loading-text2
      color: #333
      height: px2rem(30px)
      line-height: @height
</style>

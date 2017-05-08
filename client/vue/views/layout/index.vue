<template lang='pug'>
  .app-layout
    .view-box-body.vux-fix-safari-overflow-scrolling
      transition(name='app-forward', mode='out-in')
        router-view.app-forward
</template>

<style lang='stylus'>
  @import './index.styl';
</style>

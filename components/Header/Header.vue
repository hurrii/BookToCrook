<template lang="pug">
  header.header
    .container.align
      .logo BookToCrook
</template>
<style lang="stylus" scoped>
  .header
    height $headerHeightDesktop
    background $green
    box-shadow 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)

    .align
      display flex
      align-items center

    .logo
      font-weight bold
      color $powder
      user-select none
</style>

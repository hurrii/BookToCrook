<template lang="pug">
  header.header
    .content
      nuxt-link(to='/').logo BookToCrook📙
      Search

</template>

<script>
import Search from '~/components/Search/Search'

export default {
  components: {
    Search
  }
}
</script>

<style lang="stylus" scoped>
  .header
    position fixed
    top 0
    left 0
    right 0
    z-index 900
    height $headerHeightDesktop
    background $green
    box-shadow 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)

    .content
      display flex
      justify-content space-between
      align-items center
      max-width 110rem
      margin 0 auto
      padding 0 4rem
      height inherit

    .align
      display flex
      align-items center

    .logo
      font-weight bold
      color $powder
      user-select none

  @media $mobile-tablet
    .header
      .content
        padding 2rem

</style>

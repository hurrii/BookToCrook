<template lang="pug">
  .categories
    .list
      .category
        .image(:style="{ backgroundImage: `url( ${require('~/assets/img/categories/fiction.jpg')} )` }")
        .heading Художественная литература
      .category
        .image(:style="{ backgroundImage: `url( ${require('~/assets/img/categories/nonfiction.jpg')} )` }")
        .heading Научно-популярная литература
        .image
      .category
        .image(:style="{ backgroundImage: `url( ${require('~/assets/img/categories/business.png')} )` }")
        .heading Бизнес-литература
        .image
      .category
        .image(:style="{ backgroundImage: `url( ${require('~/assets/img/categories/comics.jpg')} )` }")
        .heading Комиксы
        .image
      .category
        .image(:style="{ backgroundImage: `url( ${require('~/assets/img/categories/family.png')} )` }")
        .heading Детям и родителям
        .image
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => {
    return {
    }
  },
  computed: {
    ...mapState([
      'pageData'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  .categories
    position relative
    margin 2rem 0

    .list
      display flex
      justify-content space-between

    .category
      position relative
      max-width 16rem
      width 100%
      min-height 20rem
      border-radius 7px
      box-shadow 0 0 8px 7px rgba(#000, 0.2)
      text-align center
      overflow hidden
      border 1px solid rgba(#000, .25)
      &:hover
        .image
          filter none
          transform scale(1.1)

      .image
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        background-position center top
        background-repeat no-repeat
        background-size cover
        filter grayscale(.75)
        transition filter .3s ease, transform 7s
        width 100%
        height 100%

      .heading
        position absolute
        top 1rem
        left 0
        right 0
        z-index 2
        max-width 17rem
        pointer-events none
        font-size 1.5rem
        font-weight bold
        color #fff
        text-shadow 0 0 4px #000
</style>

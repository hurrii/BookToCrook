<template lang="pug">
  .categories
    .list
      nuxt-link(v-for="category in categories" :to="{ path: `/category/${category.name}` }" :key='category.name').category
        .image(:style="{ backgroundImage: `url( ${require(`~/assets/img/categories/${category.name}.jpg`)} )` }")
        .heading {{ category.title }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => {
    return {
      categories: [
        {
          id: 1,
          name: 'fiction',
          title: 'Художественная литература'
        },
        {
          id: 2,
          name: 'nonfiction',
          title: 'Научно-популярная литература'
        },
        {
          id: 3,
          name: 'business',
          title: 'Бизнес-литература'
        },
        {
          id: 4,
          name: 'comic+books',
          title: 'Комиксы'
        },
        {
          id: 5,
          name: 'parents+and+kids',
          title: 'Детям и родителям'
        }
      ]
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
      flex 0 1 16rem
      min-height 20rem
      border-radius 8px
      box-shadow 0 0 8px 7px rgba(#000, 0.2)
      text-align center
      overflow hidden
      border 1px solid rgba(#000, .25)
      &:hover
        .image
          filter none
          transform scale(1)
          transition filter .3s ease, transform 7s

      .image
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        background-position center top
        background-repeat no-repeat
        background-size cover
        overflow hidden
        filter grayscale(.75)
        transform scale(1.1)
        transition filter .3s ease, transform 1.5s
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

  @media $mobile-tablet
    .categories

      .list
        display flex
        justify-content space-between
        flex-flow row wrap

      .category
        max-width 49%
        margin-bottom 2rem
        flex 0 0 49%
        min-height 10rem
        padding .5rem
        box-shadow 0 0 8px 3px rgba(#000, 0.2)

        .heading
          max-width unset

</style>

<template lang="pug">
    .category
      h1.title--35.title {{ defineCategoryName.title }}
      Books(:category='this.$route.params.name')
</template>

<script>
import { mapGetters } from 'vuex'
import Books from '~/components/Books/Books'

export default {
  components: {
    Books
  },
  data: () => {
    return {
    }
  },
  head() {
    return {
      title: `${this.defineCategoryName.title} - BookToCrook`
    }
  },
  computed: {
    ...mapGetters([
      'getCategories'
    ]),
    defineCategoryName() {
      return this.getCategories.find(category => category.name === this.$route.params.name)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .category
    .title
      display inline-block
      position relative
      margin-top 2rem

      &::before
        display block
        content ''
        position absolute
        bottom .5rem
        left 0
        width 100%
        height 15%
        background $green
        opacity .5

  @media $mobile
    .category
      .title
        font-size 2.2rem
</style>

<template lang="pug">
  Main
    .search-results
      h1.title.title--35 Все, что мы нашли на BookToCrook по запросу «{{ $route.params.query }}»

      Books(:searchQuery='$route.params.query')
</template>

<script>
import Main from '~/components/Main/Main.vue'
import Books from '~/components/Books/Books'

export default {
  components: {
    Main,
    Books
  },
  data() {
    return {
      query: {
        type: String,
        required: true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .search-results
    .title
      margin-top 2rem

    @media $mobile-tablet
      .title
        font-size 2.1rem
</style>

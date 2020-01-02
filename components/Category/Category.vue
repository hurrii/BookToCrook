<template lang="pug">
  .content
    .category
      h1 {{ this.$route.params.name }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => {
    return {
    }
  },
  head() {
    return {
      // title: `${this.bookData.title} - BookToCrook`
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
  .content
    margin 2rem 0
    flex 1
    padding 2rem
    background $lightgray
    border-radius $radius
    box-shadow: 0 0 4px -1px rgba($black, 0.2)
</style>

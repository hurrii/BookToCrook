<template lang='pug'>
  .page
    .preloader
    Header
    nuxt
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Header from '~/components/Header/Header.vue'

export default {
  components: {
    Header
  },
  data: () => {
    return {
      books: null
    }
  },
  computed: {
    ...mapState([
      'pageData'
    ])
  },
  mounted() {
    this.getData().then(() => {
      this.loadPageData(this.books);
      document.querySelector('.page .preloader').classList.add('loaded');
      document.querySelector('.page').classList.add('loaded');
    })
  },
  methods: {
    ...mapMutations([
      'loadPageData'
    ]),
    fetchBooks() {
        const path = 'https://www.googleapis.com/books/v1/volumes?q=fiction&maxResults=40&key=AIzaSyAwTjTf_nzeebfNVqpG1LUqqgMFvozuRo0'

        return this.$axios.$get(path).then((response) => {
            return response
        });
    },
    async getData() {
        this.books = await this.fetchBooks()
        return new Promise((resolve) => {
            resolve()
            return this.books
        })
    }
  }
}
</script>

<style lang="stylus">
  .page
    padding-top 4rem
    .preloader
      position absolute
      pointer-events none
      top 0
      left 0
      z-index 900
      width 100%
      height 100%
      background url('~assets/img/preloader.svg') no-repeat center
      opacity 0
      transition opacity 1s ease
      &:not(.loaded)
        opacity 1
</style>

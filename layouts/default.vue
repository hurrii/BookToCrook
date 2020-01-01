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
      responses: [],
      books: null
    }
  },
  computed: {
    ...mapState([
      'pageData'
    ])
  },
  mounted() {
    this.fetchBooks().then(() => {
      document.querySelector('.page .preloader').classList.add('loaded');
      document.querySelector('.page').classList.add('loaded');
    })
  },
  methods: {
    ...mapMutations([
      'loadPageData'
    ]),
    fetchBooks() {
      return new Promise(resolve => {
          const API = 'https://www.googleapis.com/books/v1/volumes?q=';
          const key = '&key=AIzaSyAwTjTf_nzeebfNVqpG1LUqqgMFvozuRo0'
          const lang = '&langRestrict=ru'
          const paths = [
            `${API}subject:fiction${lang}&maxResults=40${key}`,
            `${API}subject:fiction${lang}&maxResults=40${key}&startIndex=41`,
            `${API}subject:fiction${lang}&maxResults=40${key}&startIndex=81`
          ]

          paths.forEach(path => {
            this.$axios.$get(path).then((resp) => {
              resp.items.forEach(item => this.responses.push(item))
              this.loadPageData(this.responses)
            });
          })

          resolve()
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

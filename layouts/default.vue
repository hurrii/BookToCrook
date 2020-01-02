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
          const requests = []
          const API = 'https://www.googleapis.com/books/v1/volumes?q=';
          const options = '&maxResults=40'
          const key = '&key=AIzaSyA-X-gXjYDzE5ueWgpDluu_0I1DjC-KyVY'

          const paths = [
            `${API}subject:fiction&langRestrict=ru${options}${key}`,
            `${API}subject:nonfiction${options}${key}`,
            `${API}subject:business${options}${key}`,
            `${API}subject:comic books${options}${key}`,
            `${API}subject:parents+and+kids${options}${key}`

            // `${API}subject:fiction&langRestrict=ru${options}${key}&startIndex=41`
            // `${API}subject:fiction&langRestrict=ru${options}${key}&startIndex=81`,
            // `${API}subject:fiction&langRestrict=ru${options}${key}&startIndex=121`
          ]

          paths.forEach(path => {
            requests.push(this.$axios.$get(path).then((resp) => {
              resp.items.forEach(item => this.responses.push(item))
            }).catch(err => console.error(err)))
          })

          const passToVuex = async () => {
            await Promise.all(requests)
            this.loadPageData(this.responses)
            resolve()
          }

          passToVuex()
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

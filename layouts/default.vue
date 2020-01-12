<template lang='pug'>
  .wrapper
    .preloader
    .page
      Header
      nuxt
      Footer
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Header from '~/components/Header/Header.vue'
import Footer from '~/components/Footer/Footer.vue'

export default {
  components: {
    Header,
    Footer
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
      document.querySelector('.preloader').classList.add('loaded');
      document.querySelector('.page').classList.add('loaded');
    })
  },
  methods: {
    ...mapMutations([
      'savePageData'
    ]),
    fetchBooks() {
      return new Promise(resolve => {
          const requests = []
          const API = 'https://www.googleapis.com/books/v1/volumes?q=';
          const options = '&maxResults=40'
          const key = '&key=AIzaSyAwTjTf_nzeebfNVqpG1LUqqgMFvozuRo0'

          const paths = [
            `${API}subject:fiction&langRestrict=ru${options}${key}`,
            `${API}subject:fiction&langRestrict=ru${options}${key}&startIndex=41`,
            `${API}subject:fiction&langRestrict=ru${options}${key}&startIndex=81`,
            `${API}subject:fiction&langRestrict=ru${options}${key}&startIndex=121`,
            `${API}subject:fiction&langRestrict=ru${options}${key}&startIndex=161`,
            `${API}subject:fiction&langRestrict=ru${options}${key}&startIndex=201`,
            `${API}subject:fiction&langRestrict=ru${options}${key}&startIndex=241`,
            `${API}subject:fiction&langRestrict=ru${options}${key}&startIndex=281`,
            `${API}subject:nonfiction${options}${key}`,
            `${API}subject:nonfiction${options}${key}&startIndex=41`,
            `${API}subject:nonfiction${options}${key}&startIndex=81`,
            `${API}subject:nonfiction${options}${key}&startIndex=121`,
            `${API}subject:business${options}${key}`,
            `${API}subject:comic+books${options}${key}`,
            `${API}subject:parents+and+kids${options}${key}`,
            `${API}subject:parents+and+kids${options}${key}&startIndex=41`,
            `${API}subject:parents+and+kids${options}${key}&startIndex=81`
          ]

          paths.forEach(path => {
            requests.push(this.$axios.$get(path).then((resp) => {
              resp.items.forEach(item => this.responses.push(item))
            }).catch(err => console.error(err)))
          })

          const passToVuex = async () => {
            await Promise.all(requests)
            const result = this.responses.filter(item => item.volumeInfo.authors && item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail && item.volumeInfo.imageLinks.thumbnail)

            result.sort((a, b) => {
              if (a.volumeInfo.description && !b.volumeInfo.description) {
                return -1
              } else if (!a.volumeInfo.description && b.volumeInfo.description) {
                return 1
              }

              return 0
            }).sort((a, b) => {
              if (a.volumeInfo.readingModes.text && !b.volumeInfo.readingModes.text) {
                return -1
              } else if (!a.volumeInfo.readingModes.text && b.volumeInfo.readingModes.text) {
                return 1
              }

              return 0
            })

            this.savePageData(result)
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
    opacity 1
    transition opacity 1s ease
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

  .page
    &:not(.loaded)
      opacity 0

</style>

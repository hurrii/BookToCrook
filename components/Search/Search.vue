<template lang="pug">
  .search
    input(type='text' placeholder='Искать на BookToCrook' @input='filterPageData' @blur='clearResults' @keyup.esc='clearResults'
          @keyup.down='focusResult' @keyup.enter='submitSearch' ref='input')
    button(:disabled='searchResults.length < 1' @click='submitSearch')
      i.icon
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 96 96">
          <g id="XMLID_2_">
            <path id="XMLID_6_" d="M39.3,18c-11.8,0-21.4,9.6-21.4,21.4c0,11.8,9.6,21.4,21.4,21.4c5,0,9.6-1.7,13.2-4.5l4.9,4.9c-1.1,1.1-1.1,2.8,0,3.9l12.1,12.1c1.1,1.1,2.8,1.1,3.9,0l3.9-3.9c1.1-1.1,1.1-2.8,0-3.9L65.2,57.3c-1.1-1.1-2.8-1.1-3.9,0l-5-5c2.7-3.6,4.4-8.1,4.4-12.9C60.7,27.6,51.1,18,39.3,18z M39.3,22.5c9.3,0,16.9,7.6,16.9,16.9c0,9.3-7.6,16.9-16.9,16.9c-9.3,0-16.9-7.6-16.9-16.9C22.4,30.1,30,22.5,39.3,22.5z"/>
          </g>
        </svg>
    .results(v-if='searchQuery.length > 2' ref='resultsDropdown')
      .err(v-if='!isThereMatches') Совпадений не найдено
      .entry(v-for='result, index in searchResults' :key='result.id')
        nuxt-link(:to="{ path: '/book/' + result.id }" ref='link').link
          p(v-if='result.volumeInfo') {{ `${result.volumeInfo.authors}. ${result.volumeInfo.title}` }}

</template>

<script>
import { mapState } from 'vuex'
import { hasAuthor, hasTitle } from '~/plugins/book-helpers.js'

export default {
  data() {
    return {
      resultsFocused: false,
      searchResults: {
        type: Array,
        default: []
      },
      searchQuery: {
        type: String,
        default: ''
      }
    }
  },
  computed: {
    ...mapState(['pageData']),
    isThereMatches() {
      return this.searchQuery.length > 2 && this.searchResults.length > 0
    }
  },
  mounted() {
    this.resultsFocused = false
  },
  methods: {
    filterPageData(e) {
      const inputValue = e.target.value.toLowerCase()
      this.searchQuery = e.target.value ? inputValue : this.searchQuery

      if (this.pageData) {
          if (inputValue.length === 0) {
            this.searchResults = []
          } else if (inputValue.length > 2) {
            const result = Object.values(this.pageData).filter(book => this.$route.params.id !== book.id && (hasTitle(book, inputValue) || hasAuthor(book, inputValue)))
            this.searchResults = result
          }
      }
    },
    clearResults() {
      if (!this.resultsFocused) {
        setTimeout(() => {
          this.searchResults = []
          if (this.$refs) {
            this.$refs.input.value = ''
          }
          this.searchQuery = ''
        }, 250);
      }
    },
    focusResult() {
      const reset = () => {
        this.resultsFocused = false
        this.clearResults()
      }

      if (this.$refs.link && this.$refs.link[0]) {
        this.resultsFocused = true
        this.$refs.link[0].$el.focus()
        this.resultsFocused = false

        this.$refs.link[0].$el.addEventListener('click', reset, { once: true })
        this.$refs.link[0].$el.addEventListener('blur', reset, { once: true })
      }
    },
    submitSearch() {
      if (this.$refs.input.value && this.$refs.input.value.length > 2) {
        this.clearResults()
        this.$router.push({
          path: '/search/' + this.$refs.input.value
        })
      }
    }
  }
}
</script>

<style lang="stylus">
  .search
    position relative
    margin-left auto
    height 3rem

    .link
      display block
      &:focus
        color $green

    input
      width 20rem
      height 100%
      border 0
      border-radius 7px
      padding 0 3rem 0 .5rem
      font-size 1.2rem
      line-height normal // safari vert align fix

      &::placeholder
        transition color .2s ease

      &:focus::placeholder
        color: transparent

    button
      height calc(100% + 1px)
      width 3rem
      border-radius 0px 7px 7px 0px
      position absolute
      top 50%
      transform translateY(-50%)
      right 0
      background $metal
      transition background .2s ease
      cursor pointer
      .icon
        margin 0 auto
        width 1.8rem
        height 1.8rem
        fill white

      &:hover
        background rgba($metal, .9)

    .results
      position absolute
      top calc(3rem + 1px)
      display flex
      flex-flow row wrap
      background #fff
      width 100%
      max-height 44rem
      padding 1rem
      font-size 1.3rem
      box-shadow: 0 0 4px -1px rgba($black, 0.2)
      overflow-y auto

      .entry
        .link
          width 100%
          margin-bottom 1rem

        .err
          font-weight bold
</style>

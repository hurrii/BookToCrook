<template lang="pug">
    .row.books
      .col-3.book(v-for="book in pagenatedData" :key="book.id")
        nuxt-link(:to="{ path: '/book/' + book.id }" v-for="image, index in book.volumeInfo.imageLinks" :key="image.name" v-if="image && index === 'smallThumbnail'").cover
            img(:src="image")
        nuxt-link(:to="{ path: '/book/' + book.id }").h2.title {{ book.volumeInfo.title }}
        .author
            div(v-for="author in book.volumeInfo.authors") {{ author }}
      .col-12.pagination
          button.prev(@click="prevPage" :disabled="pageNumber < 1") Previous
          button.next(@click="nextPage" :disabled="pageNumber === pageAmount - 1") Next
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    data: {
        type: Object,
        default: () => {}
    },
    pageLimit: {
        type: Number,
        default: 8
    }
  },
  data: () => ({
    pageNumber: 0
  }),
  computed: {
    ...mapState([
      'pageData'
    ]),
    pageAmount() {
      let result = 0
      if (this.pageData.items) {
          const l = this.pageData.items.length
          const p = this.pageLimit

          result = l / p
      }

      return Math.ceil(result)
    },
    pagenatedData() {
      let result = {}
      if (this.pageData.items) {
          const start = this.pageNumber * this.pageLimit
          const end = start + this.pageLimit

          const data = Array.from(this.pageData.items).slice(start, end)
          result = { ...data }
      }

      return result
    }
  },
  methods: {
    prevPage() {
        this.pageNumber--
    },
    nextPage() {
        this.pageNumber++
    }
  }
}
</script>

<style lang="stylus" scoped>
  .row
    height 100%

  .book
    display flex
    flex-flow column wrap
    padding 2rem
    color $metal

    .cover
      transition transform 12s
      &:hover
          transform scale(1.2)
      img
          display block
          max-width 100%
          height auto
          &:hover
              box-shadow 0 0 10px 4px rgba(#000, 0.2)

    .title
      margin-top 1rem
      font-size 1.8rem
      font-weight bold
      color $metal
      &:hover
          color $green

    .author
      font-size 1.4rem
      font-weight 2.4rem
      margin-top .5rem

  .pagination
    display flex
    justify-content center
    margin-top auto

    button
      width 8rem
      height 3rem
      margin 0 .5rem
      font-size 1.4rem
      border 2px solid $green
      border-radius $radius
      transition background .2s ease, color .2s ease
      text-transform uppercase
      &:hover
          background $green
          cursor pointer
          color white

  @media $tablet
    .book
      max-width 33.332%
      flex 0 0 33.332%

  @media $mobile
    .book
      text-align center

      .cover
      .title
      .author
        max-width 20rem
        margin 0 auto

      .title
        margin-top 1rem
</style>

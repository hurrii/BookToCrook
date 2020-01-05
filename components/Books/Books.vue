<template lang="pug">
  .wrapper
    section.content
      div {{ category }}
      transition-group.row.books(name="list-fade-horizontal")
        .col-3.book(v-for="book in pagenatedData" :key="book.id")
          nuxt-link(:to="{ path: '/book/' + book.id }" v-for="image, index in book.volumeInfo.imageLinks" :key="image.name" v-if="image && index === 'smallThumbnail'").cover
            img.image.lazy(:src="image")
          nuxt-link(:to="{ path: '/book/' + book.id }" :class="book.volumeInfo.title.length > 47 ? 'popovered' : ''"
                    :data-full-title="book.volumeInfo.title").h2.title {{ contentShortener(book.volumeInfo.title) }}
          .author(v-html="contentShortener(authorsToString(book.volumeInfo.authors))")
    .pagination(v-if="pageAmount > 1" :key="'pagination'")
        button.btn.prev(@click="prevPage" :disabled="pageNumber < 1" :class="{ disabled : pageNumber < 1 }") Назад
        button.btn(v-for='page in pageAmount' @click='pageNumber = page - 1' :class='pageNumber === page - 1 ? "active" : ""' v-html='page')
        button.btn.next(@click="nextPage" :disabled="pageNumber === pageAmount - 1" :class="{ disabled : pageNumber === pageAmount - 1 }") Далее
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
    },
    category: {
      type: String,
      default: null
    }
  },
  data: () => ({
    pageNumber: 0
  }),
  computed: {
    ...mapState([
      'pageData'
    ]),
    filteredData() {
      let result = {}

      if (this.pageData) {
        result = Object.values(this.pageData).filter(book => book.volumeInfo.imageLinks)
      }

      if (this.pageData && this.category) {
        result = Object.values(this.pageData).filter(book => book.volumeInfo.infoLink.includes(this.category) && book.volumeInfo.imageLinks)
      }

      return result;
    },
    pageAmount() {
      let result = 0
      if (this.filteredData) {
          const l = Object.values(this.filteredData).length
          const p = this.pageLimit

          result = l / p
      }

      return Math.ceil(result)
    },
    pagenatedData() {
      let result = {}
      if (this.filteredData) {
          const start = this.pageNumber * this.pageLimit
          const end = start + this.pageLimit

          const data = Object.values(this.filteredData).slice(start, end)
          result = { ...data }
      }

      return result
    }
  },
  methods: {
    contentShortener(content) {
      if (content.length > 47) {
        let result = content.split('').filter((item, index) => {
          if (index < 47) {
            return item
          }
        });
        result = result.join('')
        return `${result}...`
      }

      return content
    },
    prevPage() {
        this.pageNumber--
    },
    nextPage() {
        this.pageNumber++
    },
    authorsToString(authors) {
      return authors ? authors.join(', ') : ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper
    display flex
    justify-content center
    flex-flow column wrap

  .content
    position relative
    flex 1
    margin 2rem 0
    padding 2rem
    background $lightgray
    border-radius $radius
    box-shadow: 0 0 4px -1px rgba($black, 0.2)

  .row.books
    height 100%

  .book
    display flex
    flex-flow column wrap
    color $metal

    .cover
      height 14rem

    &:hover
      .title
        color $green
      .image
        box-shadow 0 0 10px 4px rgba(#000, 0.2)

    .image
      height 100%
      transition box-shadow .35s ease

    .title
      position relative
      margin-top 1rem
      font-size 1.6rem
      line-height 1.25
      font-weight bold
      color $metal
      min-height 3rem
      &.popovered
        &::before
          content attr(data-full-title)
          display block
          position absolute
          bottom 8rem
          left 2rem
          width 100%
          z-index 1
          padding 2rem
          background $powder
          box-shadow 0 0 40px 0 rgba(#000, .3)
          border-radius 7px
          font-size 1.5rem
          opacity 0
          pointer-events none
          transition opacity .55s ease .25s

      &:hover
        &::before
          color black
          opacity 1
          pointer-events auto

    .author
      font-size 1.4rem
      line-height  2.4rem
      margin-top 1rem
      min-height 4.5rem

  .pagination
    display flex
    flex-flow row wrap
    margin 0 auto
    padding-bottom 2rem

    .btn
      user-select none
      width auto
      padding 0 .5rem
      height 3rem
      margin 0 .5rem
      font-size 1.4rem
      border 2px solid $green
      border-radius $radius
      transition background .2s ease, color .2s ease
      text-transform uppercase
      cursor pointer
      &.active
        background $green
        color white
      &.disabled
        &:hover
          cursor default
          opacity .65

  @media $desktop
    .pagination
      .btn
        &:hover
          background $green
          color white

  @media $tablet
    .book
      max-width 33.332%
      flex 0 0 33.332%

  @media $mobile-tablet
    .pagination
      .btn
        margin-bottom 1rem

        &:active
          background $green
          color white

      .prev
      .next
        order 1

  @media $mobile
    .book
      text-align center
      margin-bottom 2rem

      .cover
      .title
      .author
        max-width 20rem
        margin 0 auto

      .title
        margin-top 1rem

</style>

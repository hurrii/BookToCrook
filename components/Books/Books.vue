<template lang="pug">
  section.content
    div {{ category }}
    transition-group.row.books(name="list-fade-horizontal")
      .col-3.book(v-for="book in pagenatedData" :key="book.id")
        nuxt-link(:to="{ path: '/book/' + book.id }" v-for="image, index in book.volumeInfo.imageLinks" :key="image.name" v-if="image && index === 'smallThumbnail'").cover
          img.image.lazy(:src="image")
        nuxt-link(:to="{ path: '/book/' + book.id }" :class="book.volumeInfo.title.length > 60 ? 'popovered' : ''"
                  :data-full-title="book.volumeInfo.title").h2.title {{ titleShortener(book) }}
        .author(v-for="author in book.volumeInfo.authors") {{ author }}
      .col-12.pagination(:key="'pagination'")
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
    titleShortener(book) {
      if (book.volumeInfo.title.length > 60) {
        let result = book.volumeInfo.title.split('').filter((item, index) => {
          if (index < 50) {
            return item
          }
        });
        result = result.join('')
        return `${result}...`
      }

      return book.volumeInfo.title
    },
    prevPage() {
        this.pageNumber--
    },
    nextPage() {
        this.pageNumber++
    },
    addObserver() {
      // setTimeout(() => {
      //   const images = [...document.querySelectorAll('.image')]

      //   function callback (entries) {
      //     entries.forEach(entry => {
      //       if (entry.isIntersecting) {
      //         console.log(entry)
      //         entry.target.src = ''
      //         // entry.target.classList.remove('lazy')
      //       }
      //     });
      //   }

      //   const observer = new IntersectionObserver(callback, { root: document.querySelector('html') });

      //   images.forEach(image => observer.observe(image))
      // }, 100);
    }
  }
}
</script>

<style lang="stylus" scoped>
  .content
    flex 1
    margin 2rem 0
    padding 2rem
    background $lightgray
    border-radius $radius
    box-shadow: 0 0 4px -1px rgba($black, 0.2)

  .row
    height 100%

  .book
    display flex
    flex-flow column wrap
    padding 2rem
    color $metal

    &:hover
      .title
        color $green
      .image
        box-shadow 0 0 10px 4px rgba(#000, 0.2)

    .image
      display block
      max-width 100%
      min-height 15rem
      height auto
      transition box-shadow .35s ease
      // opacity 0
      // transition opacity .3s ease
      // &:not(.lazy)
      //   opacity 1

    .title
      position relative
      margin-top 1rem
      font-size 1.6rem
      line-height 1.25
      font-weight bold
      color $metal
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
      font-weight 2.4rem
      margin-top .5rem

  .pagination
    display flex
    justify-content center
    margin-top auto

    button
      user-select none
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

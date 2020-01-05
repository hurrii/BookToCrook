<template lang="pug">
  .content
    .book
      .row
        .col-4
          .image
            img(:src='bookData.imageLinks.thumbnail')
          .page-count.heading Количество страниц:&nbsp;
            span.normal {{ bookData.pageCount }}

        .col-8
          .info
            h1.title {{ bookData.title }}
            h2.authors(v-if='bookData.authors' v-html='bookData.authors.join(", ")')
            .publisher.heading Издательство:&nbsp;
              span.normal {{  bookData.publisher }}
            .about.heading(v-if='bookData.description') О книге
              .normal {{ bookData.description }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => {
    return {
      bookDataPlaceholder: {
        title: '',
        authors: [],
        imageLinks: [],
        publisher: '',
        description: ''
      }
    }
  },
  head() {
    return {
      title: `${this.bookData.title} - BookToCrook`
    }
  },
  computed: {
    ...mapState([
      'pageData'
    ]),
    bookData() {
      const currentBook = Object.values(this.pageData).filter(book => book.id === this.$route.params.id)

      if (currentBook.length > 0) {
        return currentBook[0].volumeInfo
      }
      return this.bookDataPlaceholder;
    }
  }
}
</script>

<style lang="stylus" scoped>
  .page
    .book
      opacity 0
      transition opacity .3s ease 1.3s
  .loaded
    .book
      opacity 1

  .content
    margin 2rem 0
    flex 1
    padding 2rem
    background $lightgray
    border-radius $radius
    box-shadow: 0 0 4px -1px rgba($black, 0.2)

  .title
    color $green
    line-height 1.15

  .authors
    margin-top .5rem

  .page-count
  .publisher
  .about
    margin-top 1rem

  .image
    border-radius: 9px

    img
      width 100%
      max-width 25rem
      height auto

  .heading
    font-size 1.8rem
    font-weight bold

  .normal
    font-size 1.5rem
    font-weight 400

  .about
    .normal
      font-size 1.6rem
      line-height 2.6rem
      margin-top .5rem

  @media $tablet
    .row
      // .col-3
      // .col-9
      //   max-width 49.99%
      //   flex 0 0 49.99%

      .col-9
        order 1
      .col-3
        order 2

  @media $mobile
    .heading
      margin-top .5rem

    .title
      margin-top 2rem

    .publisher
      margin-top 2rem
</style>

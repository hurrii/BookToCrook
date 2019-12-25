<template lang="pug">
  .book
    .row
      .col-4
        .image
          img(:src='bookData.imageLinks.thumbnail')
        .lang.heading Язык:&nbsp;
          span.normal {{ bookData.language }}
        .page-count.heading Количество страниц:&nbsp;
          span.normal {{ bookData.pageCount }}

      .col-8
        .info
          h1.title {{ bookData.title }}
          h2.authors(v-html='bookData.authors.join(", ")')
          .publisher.heading Издательство:&nbsp;
            span.normal {{  bookData.publisher }}
          .about.heading(v-if='bookData.description') О книге
            .normal {{ bookData.description }}
    //- .row
    //-   .col-3
    //-   .col-9
    //-     .asdas {{ bookData }}
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
  computed: {
    ...mapState([
      'pageData'
    ]),
    bookData() {
      if (this.pageData.items) {
        return this.pageData.items.filter(book => book.id === this.$route.params.id)[0].volumeInfo
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

  .title
    color $green
    line-height 1.15

  .authors
    margin-top .5rem

  .lang
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

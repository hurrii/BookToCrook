<template lang="pug">
  .book
    .row
      .col-3
        .image
          img(:src='bookData.imageLinks.thumbnail')
        .lang.heading Язык:&nbsp;
          span.normal {{ bookData.language }}
        .page-count.heading Количество страниц:&nbsp;
          span.normal {{ bookData.pageCount }}

      .col-9
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
    display: flex;
    border-radius: 9px;
    overflow: hidden;
    padding-top 1rem
    padding-left 1rem
    background $metal

    img
      width 25rem
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

</style>

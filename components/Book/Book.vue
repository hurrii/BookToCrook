<template lang="pug">
  .content
    .book
      .row
        .col-3
          .image
            img(:src='bookData.imageLinks.thumbnail')
          .page-count.heading Количество страниц:&nbsp;
            span.normal {{ bookData.pageCount }}

        .col-9
          .info
            h1.title {{ bookData.title }}
            h2.authors(v-if='bookData.authors' v-html='bookData.authors.join(", ")')
            .publisher.heading Издательство:&nbsp;
              span.normal {{  bookData.publisher }}
            .about.heading(v-if='bookData.description') О книге
              .normal {{ bookData.description }}
            a.preview(v-if='isTherePreview' :href='bookData.previewLink' target='_blank') Читать отрывок

      .row.lower(v-if='moreFromAuthor.length > 0')
        .col-12
          .more-heading Еще от автора:
          .row.more
            nuxt-link(v-for='book of moreFromAuthor' :to='{ path: book.id }' :key='book.id').col-3.item
              .cover
                img(:src='book.volumeInfo.imageLinks.thumbnail')
              .heading {{ book.volumeInfo.title }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => {
    return {
      bookDataPlaceholder: {
        title: '',
        authors: [],
        imageLinks: {
          thumbnail: ''
        },
        publisher: '',
        description: '',
        readingModes: {
          text: false,
          image: false
        }
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
    },
    moreFromAuthor() {
      if (this.pageData) {
        const results = Object.values(this.pageData).filter(book => JSON.stringify(book.volumeInfo.authors) === JSON.stringify(this.bookData.authors) && book.id !== this.$route.params.id)
        return results.filter((item, index) => index > 3 ? null : item)
      }
      return []
    },
    isTherePreview() {
      return this.bookData.readingModes.text || this.bookData.readingModes.image
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

  .lower
    margin-top 4rem

  .content
    margin 2rem 0
    flex 1
    padding 2rem
    background $lightgray
    border-radius $radius
    box-shadow: 0 0 4px -1px rgba($black, 0.2)

  .info
    min-height 50rem

  .title
    font-size 3.5rem
    line-height 1.15

  .authors
    margin-top .5rem

  .page-count
  .publisher
  .about
    margin-top 1rem

  .image
    border-radius: 9px
    display flex
    max-width: 21rem
    height 30rem

    img
      flex 1 1 100%

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

  .more
    margin-top 2rem

    .cover
      img
        height 15rem

  .more-heading
    font-size 2.1rem
    font-weight 700
    line-height 1.25

  .preview
    display inline-block
    margin-top 1rem
    font-size 1.8rem
    font-weight bold

  @media $tablet
    .row

      .col-9
        order 1
      .col-3
        order 2

  @media $mobile-tablet
    .image
      height auto
      img
        flex 0
        object-fit contain

  @media $mobile
    .heading
      margin-top .5rem
      font-size 1.4rem

    .title
      margin-top 2rem

    .publisher
      margin-top 2rem

    .info
      min-height auto

    .item
      margin-bottom 2rem
      max-width 49.9%
      flex 0 1 49.9%
</style>

<template lang="pug">
    .row
        .col-3.book(v-for="book in this.books" :key="book.id")
            .cover
                img(:src="book.cover")
                h2.title {{ book.title }}
                .author {{ book.title }}
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    data: () => ({
        books: [
            {
                'cover': 'https://picsum.photos/id/442/350/400',
                'title': 'This is Going to Hurt',
                'author': 'Adam Kay'
            },
            {
                'cover': 'https://picsum.photos/id/446/350/400',
                'title': 'This is Going to Hurt',
                'author': 'Adam Kay'
            },
            {
                'cover': 'https://picsum.photos/id/416/350/400',
                'title': 'This is Going to Hurt',
                'author': 'Adam Kay'
            },
            {
                'cover': 'https://picsum.photos/id/227/350/400',
                'title': 'This is Going to Hurt',
                'author': 'Adam Kay'
            },
            {
                'cover': 'https://picsum.photos/id/646/350/400',
                'title': 'This is Going to Hurt',
                'author': 'Adam Kay'
            },
            {
                'cover': 'https://picsum.photos/id/716/350/400',
                'title': 'This is Going to Hurt',
                'author': 'Adam Kay'
            },
            {
                'cover': 'https://picsum.photos/id/126/350/400',
                'title': 'This is Going to Hurt',
                'author': 'Adam Kay'
            },
            {
                'cover': 'https://picsum.photos/id/355/350/400',
                'title': 'This is Going to Hurt',
                'author': 'Adam Kay'
            },
            {
                'cover': 'https://picsum.photos/id/526/350/400',
                'title': 'This is Going to Hurt',
                'author': 'Adam Kay'
            },
            {
                'cover': 'https://picsum.photos/id/476/350/400',
                'title': 'This is Going to Hurt',
                'author': 'Adam Kay'
            },
            {
                'cover': 'https://picsum.photos/id/526/350/400',
                'title': 'This is Going to Hurt',
                'author': 'Adam Kay'
            },
            {
                'cover': 'https://picsum.photos/id/776/350/400',
                'title': 'This is Going to Hurt',
                'author': 'Adam Kay'
            },
            {
                'cover': 'https://picsum.photos/id/236/350/400',
                'title': 'This is Going to Hurt',
                'author': 'Adam Kay'
            }
        ]
    })
}
</script>

<style lang="stylus" scoped>
    .book
      display flex
      flex-flow column wrap
      align-items center
      padding 2rem

      .cover
        img
          display block
          width 100%
          height auto
</style>

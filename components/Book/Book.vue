<template lang="pug">
    .row
        .col-3.book(v-for="book in this.pageData" :key="book.id")
            .cover(v-for="image, index in book.volumeInfo.imageLinks" :key="image.name" v-if="image && index === 'smallThumbnail'")
                img(:src="image")
            .h2.title {{ book.volumeInfo.title }}
            .author
                div(v-for="author in book.volumeInfo.authors") {{ author }}
            .pages(v-if="book.volumeInfo.pageCount") {{ book.volumeInfo.pageCount }} стр.
        .col-12.pagination
            button.prev(@click="prevPage" :disabled="pageNumber < 1") Previous
            button.next(@click="nextPage" :disabled="pageNumber === pageAmount - 1") Next
</template>

<script>
// https://www.googleapis.com/books/v1/volumes?q=fiction&key=AIzaSyAwTjTf_nzeebfNVqpG1LUqqgMFvozuRo0
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
        items: [],
        books: {},
        pageNumber: 0
    }),
    computed: {
        pageAmount() {
            let result = 0
            if (this.books.items) {
                const l = this.books.items.length
                const p = this.pageLimit

                result = l / p
            }
                return Math.ceil(result)
        },
        pageData() {
            let result = {}
            if (this.books.items) {
                const start = this.pageNumber * this.pageLimit
                const end = start + this.pageLimit

                const data = Array.from(this.books.items).slice(start, end)
                result = { ...data }
            }

            return result
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        prevPage() {
            this.pageNumber--
        },
        nextPage() {
            this.pageNumber++
        },
        fetchBooks() {
            const path = 'https://www.googleapis.com/books/v1/volumes?q=fiction&maxResults=40&key=AIzaSyAwTjTf_nzeebfNVqpG1LUqqgMFvozuRo0'

            return this.$axios.$get(path).then((response) => {
                return response
            });
        },
        async getData() {
            this.books = await this.fetchBooks()
            return this.books
        }
    }
}
</script>

<style lang="stylus" scoped>
    .book
        display flex
        flex-flow column wrap
        padding 2rem

        .cover
            width 10rem
            height 18rem
            img
                display block
                width 100%
                height auto

        .title
            margin-top 1rem
            font-size 1.8rem
            font-weight bold

        .pages
            font-size 1.2rem

        .pages
        .author
            font-size 1.4rem
            font-weight 2.4rem
            margin-top .5rem

    .pagination
        display flex
        justify-content center

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

</style>

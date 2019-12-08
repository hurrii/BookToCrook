<template lang="pug">
    .row {{ this.getData }}
        h1.title {{ this.getData.title }}
        .authors
</template>

<script>
// Implement Vuex
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
        book: null
    }),
    computed: {
        getData() {
            if (this.book) {
                return this.book
            }
            return {};
        }
    },
    mounted() {
        this.book = this.$route.query.book.volumeInfo
        console.log(this.$route)
    },
    methods: {}
}
</script>

<style lang="stylus" scoped>
    .row
        height 100%

</style>

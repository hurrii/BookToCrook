<template lang='pug'>
  Main
    .wrapper.row
        .col-6
            img(src="~/assets/img/404.png")
        .col-6.text
            h1 404.
            h2 Такой страницы нет
            nuxt-link(to="/") Вернуться на главную
</template>

<script>
import Main from '~/components/Main/Main.vue'
export default {
  components: {
      Main
  }
}
</script>

<style lang="stylus" scoped>
   .wrapper
       margin-top 4rem

       h1
        font-size 6.5rem

       .text
           text-align center

        img
            display block
            max-width 100%
</style>

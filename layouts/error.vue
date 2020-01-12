<template lang='pug'>
  Main
    .wrapper.row
        .col-6
          .image
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
      height 100%

      h1
        font-size 6.5rem

      .text
        display flex
        justify-content center
        align-items center
        flex-flow column wrap
        text-align center

    @media $desktop
      .col-6
      .image
        height inherit

        img
          height 100%
          object-fit contain

</style>

<template lang="pug">
    main.main
      .container
        .content
          slot
</template>

<script>
export default {
  components: {}
}
</script>

<style lang="stylus" scoped>
  .main
    display flex
    flex 1

    .container
      display flex

    .content
      flex 1
      margin 2rem 0
      padding 2rem
      background $lightgray
      border-radius $radius
      box-shadow: 0 0 4px -1px rgba($black, 0.2);

</style>

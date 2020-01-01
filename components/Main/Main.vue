<template lang="pug">
    main.main
      section.container
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

</style>

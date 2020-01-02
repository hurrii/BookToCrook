<template lang="pug">
    main.main
      section.container
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
      flex-flow column wrap

</style>

<template lang='pug'>
  Main
    div 123
</template>

<script>
import Main from '~/components/Main/Main.vue'

export default {
  components: {
    Main
  },
  mounted() {
    console.log(this);
  }
}
</script>

<style lang='stylus'>
</style>

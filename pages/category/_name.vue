<template lang="pug">
  Main
    Category
    Books(:category='this.$route.params.name')
</template>

<script>
import Main from '~/components/Main/Main'
import Category from '~/components/Category/Category'
import Books from '~/components/Books/Books'

export default {
  components: {
    Main,
    Category,
    Books
  }
}
</script>

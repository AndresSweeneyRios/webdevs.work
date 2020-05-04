<template lang="pug">
  main
    Navigation
    router-view.view
    Footer
</template>

<style lang="sass" scoped>
  main
    min-height: 100vh
    display: flex
    flex-direction: column
    align-items: center

  .view
    flex-grow: 1
    width: 100%
    max-width: 688px
</style>

<script>
  import Navigation from '@/components/Navigation'
  import Footer from '@/components/Footer'

  export default {
    components: {
      Navigation,
      Footer,
    },
  }
</script>

<template lang="pug">
  #app
    component.layout( :is="layout" v-if="route" )
</template>

<style lang="sass">
  @import './sass/global'
</style>

<style lang="sass" scoped>
  #app
    padding: 0 60px

  #app, .layout
    display: flex
    width: 100%
    height: 100vh
</style>

<script>
  import DefaultLayout from '@/layouts/Default'

  export default {
    components: {
      DefaultLayout,
    },

    computed: {
      route () {
        return this.$router.options.routes.find(
          ({ name }) => name === this.$route.name,
        )
      },

      layout () {
        return (this.route && this.route.layout) || DefaultLayout
      },
    },

    mounted () {
    },
  }
</script>

<template lang="pug">
  section.navigation
    a.header( href="/" ) {{ config.meta.title }}
    a( href="/jobs" ) Jobs
    span •
    a( href="/developers" ) Developers
    span •
    a( href="/login" ) Log in
</template>

<script>
  import config from 'config'

  export default {
    data () {
      return {
        config,
      }
    },
  }
</script>

<style lang="sass" scoped>
  section.navigation
    min-height: 90px
    display: flex
    align-items: center
    font-weight: bold
    width: 100%
    flex-wrap: wrap
    align-content: center

    @media (max-width: 550px)
      height: 60px

      a.header
        width: 100%
        margin-bottom: 10px
        margin-top: 10px

    a, span
      font-size: 14px
      text-decoration: none
      color: var(--header)

    a.header
      margin-right: auto
      font-size: 24px

    a:not(.header):hover
      text-decoration: underline

    span
      margin: 0 8px
</style>

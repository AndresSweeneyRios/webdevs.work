<template lang="pug">
  section.navigation
    a.header( href="/" ) webdev jobs
    a( href="/jobs" ) Jobs
    span •
    a( href="/developers" ) Developers
    span •
    a( href="/account" ) Account
</template>

<style lang="sass" scoped>
  section.navigation
    min-height: 90px
    display: flex
    align-items: center
    font-weight: bold
    width: 100%
    color: var(--header)
    flex-wrap: wrap
    justify-content: center

    @media (max-width: 550px)
      margin: 15px 0

      a.header
        width: 100%
        text-align: center

    a, span
      font-size: 14px
      text-decoration: none

    a.header
      margin-right: auto
      font-size: 24px

    a:not(.header):hover
      text-decoration: underline

    span
      margin: 0 8px
</style>

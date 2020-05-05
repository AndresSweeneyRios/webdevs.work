<template lang="pug">
  section.footer
    a( href="/tos" ) Terms of Service
    span •
    a( href="/privacy" ) Privacy Policy

    span.company © Example LLC
</template>

<style lang="sass" scoped>
  section.footer
    height: 90px
    display: flex
    align-items: center
    font-weight: bold
    width: 100%
    flex-wrap: wrap
    align-content: center

    @media (max-width: 550px)
      margin: 15px 0
      height: 60px

      .company
        width: 100%
        margin-top: 10px
        margin-bottom: 10px

    a, span
      font-size: 13px
      text-decoration: none
      color: #A4A4A4

    .company
      margin-left: auto

    a:hover
      text-decoration: underline

    span:not(.company)
      margin: 0 8px
</style>

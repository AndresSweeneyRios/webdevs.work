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
    justify-content: center

    @media (max-width: 550px)
      margin: 15px 0

      .company
        width: 100%
        text-align: center

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

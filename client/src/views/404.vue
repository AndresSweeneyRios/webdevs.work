<template lang="pug">
  section.not-found
    h1 404
    .divider
    h1 This page doesn't exist.
</template>

<style lang="sass" scoped>
  @keyframes rainbowMove
    0%
      background-position: 400%

    100%
      background-position: 0%

  section.not-found
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    margin: auto
    background-image: linear-gradient(to right, rgba(black, 0.9), rgba(black, 0.7), rgba(black, 0.5), rgba(black, 0.3), rgba(black, 0.5), rgba(black, 0.7), rgba(black, 0.9))
    background-size: 400% 100%
    background-clip: text
    text-fill-color: transparent
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent
    -moz-background-clip: text
    -moz-text-fill-color: transparent
    animation: rainbowMove infinite 10s linear
    filter: saturate(0%) brightness(1)
    height: 100vh

    h1:first-child
      font-size: 40px

    h1:last-child
      font-weight: 200
      font-size: 20px
</style>

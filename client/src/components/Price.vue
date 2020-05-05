<template lang="pug">
  section.input.radius
    slot
</template>

<style lang="sass" scoped>
  section.input
    border: 1px solid var(--subtext)
    height: 40px
    display: flex
    overflow: hidden
    color: var(--text)
    fill: var(--text)
    font-weight: bold
    font-size: 16px
    align-items: center
    justify-content: center
</style>

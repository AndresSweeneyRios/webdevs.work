<template lang="pug">
  section.input.radius
    slot
</template>

<script>
  export default {
    props: ['placeholder', 'type'],
  }
</script>

<style lang="sass" scoped>
  section.input
    // background-color: var(--input-background)
    border: 1px solid var(--subtext)
    height: 40px
    display: flex
    overflow: hidden
    color: var(--text)
    fill: var(--text)
    
    // input
    //   flex-grow: 1
    //   font-weight: bold
    //   font-size: 16px
</style>

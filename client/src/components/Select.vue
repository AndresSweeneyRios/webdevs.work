<template lang="pug">
  section.select
    select.radius( v-model="value" @change="output" )
      slot

    Icon.arrow arrow
</template>

<script>
  import Icon from './Icon'

  export default {
    props: {
      value: {
        type: String,
        required: true,
      },
    },

    components: {
      Icon,
    },

    methods: {
      output ({ target }) {
        this.$emit('input', target.value)
      },
    },
  }
</script>

<style lang="sass" scoped>
  .select
    background-color: var(--input-background)
    height: 40px
    display: flex
    align-items: center
    position: relative

  select
    padding: 0 10px
    -webkit-appearance: none
    -moz-appearance: none
    flex-grow: 1
    color: var(--text)
    font-weight: bold
    cursor: pointer
    font-size: 14px
    height: 40px
    padding-left: 30px

  .arrow
    position: absolute
    pointer-events: none
    left: 13px
</style>

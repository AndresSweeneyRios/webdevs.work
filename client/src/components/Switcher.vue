<template lang="pug">
  section
    button( 
      v-for="option in options" 
      :key="option" 
      @click="output(option)"
      :selected="selected === option"
    ) {{ option }}
</template>

<script>
  export default {
    props: {
      options: {
        type: Array,
        required: true,
      },

      value: {
        type: String,
        required: false,
        default () {
          return this.options[0]
        },
      },
    },

    data () {
      return {
        selected: this.value,
      }
    },

    methods: {
      output (option) {
        this.selected = option
        this.$emit('input', option)
      },
    },
  }
</script>

<style lang="sass" scoped>
  section
    border-radius: 3px
    display: inline-block

  button
    border-radius: 0
    width: 100px
    height: 100%
    display: inline-block
    border-top: 1px solid var(--button-background)
    border-bottom: 1px solid var(--button-background)

    &:first-child
      border-left: 1px solid var(--button-background)
      border-radius: 3px 0 0 3px

    &:last-child
      border-right: 1px solid var(--button-background)
      border-radius: 0 3px 3px 0

    &:hover
      background-color: var(--button-background)
    
    &:not([selected])
      background-color: transparent
      color: black
</style>

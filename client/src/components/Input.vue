<template lang="pug">
  section.input.radius( :hasIcon="Boolean(icon)" )
    .icon( v-if="icon" )
      Icon {{ icon }}

    input( 
      :placeholder="placeholder" 
      :type="type" 
      :value="value"
      @input="output" 
    )
</template>

<script>
  import Icon from '@/components/Icon'

  export default {
    props: {
      value: {
        type: String,
        default () {
          return ''
        },
      },

      icon: {
        type: String,
      },

      placeholder: {
        type: String,
      },

      type: {
        type: String,
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
  section.input
    background-color: var(--input-background)
    height: 40px
    display: flex
    overflow: hidden
    color: var(--text)
    fill: var(--text)
    padding-right: 8px

    .icon
      width: 40px
      height: 40px
      display: flex
      align-items: center
      justify-content: center
    
    input
      flex-grow: 1
      font-weight: bold
      font-size: 16px

    &:not([hasIcon])
      padding-left: 8px
</style>

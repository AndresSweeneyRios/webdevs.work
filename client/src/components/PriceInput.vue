<template lang="pug">
  Price.price
    span $
    //- input( :placeholder="placeholder" )

    .fake-input
      span.editable( 
        contenteditable="true" 
        @keypress="keypress" 
        @input="({ target }) => min = target.textContent" 
        v-once
      ) {{ value.min }}

      span.placeholder min

    span -

    .fake-input
      span.editable( 
        contenteditable="true" 
        @keypress="keypress" 
        @input="({ target }) => max = target.textContent" 
        v-once
      ) {{ value.max }}

      span.placeholder max

    //- input( :placeholder="placeholder" )
</template>

<script>
  import Price from '@/components/Price'

  export default {
    props: {
      value: {
        type: Object,
        default () {
          return {
            min: 0,
            max: 1000,
          }
        },
      },
    },

    components: {
      Price,
    },

    data () {
      return {
        min: 0,
        max: 1000,
      }
    },

    methods: {
      keypress (event) {
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault()
          event.stopPropagation()

          return false
        }
      },

      output () {
        const { min, max } = this

        this.$emit('input', {
          min: Number(min),
          max: Number(max), 
        })
      },
    },

    watch: {
      min () {
        this.output()
      },

      max () {
        this.output()
      },
    },
  }
</script>

<style lang="sass" scoped>
  .price
    height: 40px
    display: flex
    overflow: hidden
    color: var(--text)
    fill: var(--text)
    display: flex
    align-items: center
    justify-content: center
    width: auto
    padding: 0 10px

    .icon
      width: 40px
      height: 40px
      display: flex
      align-items: center
      justify-content: center

    span
      margin-right: 4px
      font-weight: bold
      font-size: 16px

    .fake-input
      position: relative
      outline: none

      span
        display: block

      span:empty
        min-width: 30px

      span + .placeholder
        pointer-events: none
        position: absolute
        opacity: 0
        top: 0

      span:empty + .placeholder
        opacity: 0.7
    
    input
      flex-grow: 1
      font-weight: bold
      font-size: 16px
</style>

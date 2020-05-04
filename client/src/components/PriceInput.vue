<template lang="pug">
  Price.price
    span $
    //- input( :placeholder="placeholder" )

    .fake-input
      span.editable( 
        contenteditable="true" 
        @keypress="keypress" 
        @input="({ target }) => min = target.textContent" 
      )

      span.placeholder min

    span -

    .fake-input
      span.editable( 
        contenteditable="true" 
        @keypress="keypress" 
        @input="({ target }) => max = target.textContent" 
      )

      span.placeholder max

    //- input( :placeholder="placeholder" )
</template>

<script>
  import Price from '@/components/Price'

  export default {
    components: {
      Price,
    },

    data () {
      return {
        min: '',
        max: '',
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
    },

    watch: {
      min (text) {
        console.log(text)
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

      span
        display: block
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

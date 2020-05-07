<template lang="pug">
  section.post-job
    div
      Switcher( :options="['edit', 'preview']" v-model="view" )

    .edit( v-show="view === 'edit'" )
      h3 Title
      div
        Input( v-model="job.title" )

      h3 Price
      div.price
        PriceInput( v-model="job.price" )

        Select( v-model="job.currency" )
          option USD
          option CAD

        Select( v-model="job.priceType" )
          option fixed
          option hourly

      h3 Description
      div( contenteditable @input="({ target }) => job.description = target.innerText" v-once ) {{ job.description }}

    div( v-show="view === 'preview'" )
      Job( :job="job" )
</template>

<script>
  import Job from '@/components/Job.vue'
  import Input from '@/components/Input.vue'
  import Select from '@/components/Select.vue'
  import PriceInput from '@/components/PriceInput.vue'
  import Switcher from '@/components/Switcher.vue'

  export default {
    components: {
      Job,
      Input,
      Switcher,
      PriceInput,
      Select,
    },

    data () {
      return {
        view: 'edit',

        job: {
          title: 'Vue.js Developer Needed',
          location: 'Redmond, WA',
          price: 50.00,
          currency: 'USD',
          priceType: 'hourly',
          description: `Lorem ipsum dolor sit amet, **consectetur adipiscing elit.** Nunc augue mi, *porttitor id nunc non*, ~blandit pharetra ante~. \n\n***\n \nVivamus imperdiet, eros sit amet lacinia lacinia, dolor neque laoreet nibh, id fringilla justo massa vitae eros.\n \n- Nulla cursus tempor maximus. \n- Etiam nec quam dolor. \n- Aenean in arcu porttitor. \n\nLaoreet ante eu, cursus nunc. Etiam sed nunc in magna iaculis sagittis. Etiam accumsan convallis porttitor. Morbi in semper ipsum. `,
          createdAt: Date.now(),
        },
      }
    },
  }
</script>

<style lang="sass" scoped>
  section.post-job
    height: 100%
    width: 100%
    display: flex
    flex-direction: column
    padding: 60px 0
    color: var(--text)

    h3
      margin-bottom: 15px

    div[contenteditable]
      background-color: var(--input-background)
      border-radius: 3px
      padding: 8px
      white-space: pre-wrap
      word-wrap: break-word
      font-size: 16px

    div:not(:last-child)
      margin-bottom: 40px

    .price
      display: flex

      // > .select
      //   flex-grow: 1

      > *:not(:last-child)
          margin-right: 15px
</style>

<template lang="pug">
  section.jobs
    h1 Jobs
    .row
      Input.search( 
        placeholder="react, vue.js, express" 
        icon="search" 
        v-model="search" 
      )

    .row.desktop
      MinMaxPriceInput( 
        placeholder="min" 
        v-model="price" 
        v-if="priceType !== 'all prices'" 
      )

      Select( v-model="priceType" )
        option fixed
        option hourly
        option all prices

      Input.location( 
        placeholder="location" 
        icon="map-pin" 
        v-model="location" 
      )

    .row.mobile
      Input.location( 
        placeholder="Location" 
        icon="map-pin" 
        v-model="location" 
      )

    .row.mobile
      MinMaxPriceInput( 
        placeholder="min" 
        v-model="price" 
        v-if="priceType !== 'all prices'" 
      )

      Select.select( v-model="priceType" )
        option fixed
        option hourly
        option all prices

    .row
      button.submit Search

    p.subtext Looking to hire? 
      a( href="/jobs/post" ) Post a job

    .list
      Job( :job="defaultJob" short )
      Job( :job="defaultJob" short )
      Job( :job="defaultJob" short )
</template>

<script>
  import Input from '@/components/Input'
  import Select from '@/components/Select'
  import MinMaxPriceInput from '@/components/MinMaxPriceInput'
  import Job from '@/components/Job'

  export default {
    components: {
      Input,
      MinMaxPriceInput,
      Select,
      Job,
    },

    data () {
      return {
        price: {
          min: 0,
          max: 1000,
        },

        priceType: 'all prices',

        search: '',

        location: '',

        defaultJob: {
          title: 'Vue.js Developer Needed',
          location: 'Redmond, WA',
          price: '$50.00',
          priceType: 'hourly',
          description: `Lorem ipsum dolor sit amet, **consectetur adipiscing elit.** Nunc augue mi, *porttitor id nunc non*, ~blandit pharetra ante~. \n\n***\n \nVivamus imperdiet, eros sit amet lacinia lacinia, dolor neque laoreet nibh, id fringilla justo massa vitae eros.\n \n- Nulla cursus tempor maximus. \n- Etiam nec quam dolor. \n- Aenean in arcu porttitor. \n\nLaoreet ante eu, cursus nunc. Etiam sed nunc in magna iaculis sagittis. Etiam accumsan convallis porttitor. Morbi in semper ipsum. `,
          createdAt: Date.now(),
        },
      }
    },

    watch: {
      priceType (newPrice) {
        console.log(newPrice)
      },
    },
  }
</script>

<style lang="sass" scoped>
  section.jobs
    display: flex
    flex-direction: column
    align-items: center
    padding-top: 90px
    padding-bottom: 30px

    h1
      margin-bottom: 19px

    .search, .location
      flex-grow: 1

    .dash
      font-size: 16px
      display: flex
      align-items: center

    .row
      display: flex
      width: 100%
      margin-bottom: 15px

      > *:not(:last-child)
        margin-right: 15px

    p.subtext
      margin-bottom: 30px

    .mobile
      display: none

    .submit
      flex-grow: 1

    .list
      width: 100%

    .job:not(:last-child)
      border-bottom: 1px solid rgba(#A4A4A4, 0.27)

    @media (max-width: 700px)
      .desktop
        display: none

      .mobile
        display: flex

      .select
        flex-grow: 1
</style>

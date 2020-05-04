<template lang="pug">
  section.jobs
    h1 Jobs
    .row
      Input.search( placeholder="react, vue.js, express" icon="search" )

    .row.desktop
      PriceInput( placeholder="min" )

      Select
        option fixed
        option hourly
        option all prices

      Input.location( placeholder="Location" icon="map-pin" )

    .row.mobile
      PriceInput( placeholder="min" )

    .row.mobile
      Input.location( placeholder="Location" icon="map-pin" )
</template>

<style lang="sass" scoped>
  section.jobs
    display: flex
    flex-direction: column
    align-items: center
    padding-top: 90px

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

    .mobile
      display: none

    @media (max-width: 700px)
      .desktop
        display: none

      .mobile
        display: flex
</style>

<script>
  import Input from '@/components/Input'
  import Select from '@/components/Select'
  import PriceInput from '@/components/PriceInput'

  export default {
    components: {
      Input,
      PriceInput,
      Select,
    },
  }
</script>

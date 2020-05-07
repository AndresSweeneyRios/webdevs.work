<template lang="pug">
  section.job( :short="short" )
    .header
      h2 
        a( href="/jobs/abcdefg" ) {{ job.title }}

      h2.location  - {{ job.location }}

      p.price.radius {{ job.price }}{{job.priceType === 'hourly' ? ' / hour' : '' }}

    p.date.subtext {{ renderedDate }}

    p.description( v-html="renderedDescription" )

    button.apply( v-if="!short" ) Apply
</template>

<script>
  import Price from './Price'
  import marked from 'marked'

  export default {
    props: {
      short: {
        type: Boolean,
        required: false,
      },

      job: {
        type: Object,
        requred: true,
      },
    },

    components: {
      Price,
    },

    computed: {
      renderedDate () {
        const [month, day, year] = new Date(this.job.createdAt)
          .toString()
          .split(' ')
          .slice(1, 4)


        return `${month} ${day}, ${year}`
      },

      renderedDescription () {
        const markdown = marked(this.job.description)

        if (this.short) {
          const content = document.createElement('div')

          content.innerHTML = markdown

          return content.textContent
        } else {
          return markdown
        }
      },
    },
  }
</script>

<style lang="sass">
  section.job 
    ul
      list-style: inside

      li:not(:last-child)
        margin-bottom: -15px

    hr
      border: none
      border-bottom: 1px solid rgba(#A4A4A4, 0.27)

    *
      white-space: pre-wrap
      word-wrap: break-word
</style>

<style lang="sass" scoped>
  section.job
    width: 100%
    padding: 0

    > *:not(:last-child)
      margin-bottom: 15px

    h2
      font-size: 18px

      // > a
      //   color: var(--header)

  .location
    color: var(--text)
    font-weight: 400

  .date
    font-size: 13px

  .description
    font-size: 16px
    color: var(--text)
    max-width: 688px
    font-weight: 400

  .header
    display: flex
    align-items: center
    flex-wrap: wrap

  .price
    padding: 0 10px
    font-weight: bold
    background-color: var(--input-background)
    color: var(--text)
    height: 30px
    display: flex
    align-items: center

  section.job[short]
    padding: 30px 0

    .description
      display: -webkit-box
      -webkit-line-clamp: 4
      -webkit-box-orient: vertical
      overflow: hidden
      text-overflow: ellipsis

  @media (max-width: 700px)
    .header
      flex-direction: column
      align-items: flex-start

      > *:not(:last-child)
        margin-bottom: 15px

  @media (min-width: 700px)
    .price
      margin-left: 15px

    .location
      margin-left: 5px
</style>

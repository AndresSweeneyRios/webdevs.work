<template lang="pug">
  .form.login
    h1 Log in

    .social
      button.fill
        Icon google

      button.fill
        Icon github

      button.fill
        Icon twitter

      button.fill
        Icon discord

    .divider OR

    input( placeholder="Username.." v-model="username" )
    input( placeholder="Password.." type="password" v-model="password" )

    button.fill( :disabled="!valid" @click="submit" )
      span Submit
    p 
      span Don't have an account? 
      a( href="/signup" ) Sign up
</template>

<script>
  import Icon from '@/components/Icon'

  export default {
    data () {
      return {
        username: '',
        password: '',
      }
    },

    components: {
      Icon,
    },

    methods: {
      validateUsername () {
        return !/[^A-z0-9_\- \.]/.test(this.username)
      },

      validatePassword () {
        return this.password.length >= 6 
      },

      submit () {
        const {
          username, 
          password, 
        } = this

        const { rsa } = this.$store.state

        this.api('/api/users/login', { 
          method: 'post', 
          data: {
            username, 
            password,
          },
        }).then(console.log)
      },
    },

    computed: {
      valid () {
        return this.validateUsername() && this.validatePassword()
      },
    },
  }
</script>

<style lang="sass" scoped>
  @import '../sass/form'
</style>

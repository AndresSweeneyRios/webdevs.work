<template lang="pug">
  .form.login
    h1 Log in

    Input( placeholder="email or phone number" v-model="username" icon="user" )
    Input( placeholder="password" type="password" v-model="password" icon="lock" )

    p.subtext
      router-link( to="/forgot-password" ) Forgot password?

    button.fill( :disabled="!valid" @click="submit" )
      span Submit

    p.subtext 
      span Don't have an account? 
      router-link( to="/signup" ) Sign up
</template>

<script>
  import Input from '@/components/Input'

  export default {
    data () {
      return {
        username: '',
        password: '',
      }
    },

    components: {
      Input,
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

<template lang="pug">
  .form.signup
    h1 Sign up

    input( placeholder="Username.." v-model="username" )
    input( placeholder="Password.." type="password" v-model="password" )
    input( placeholder="Confirm password.." type="password" v-model="confirmPassword" )

    button.fill( :disabled="!valid" @click="submit" )
      span Submit

    p 
      span Already have an account? 
      a( href="/login" ) Log in
</template>

<script>
  export default {
    data () {
      return {
        username: '',
        password: '',
        confirmPassword: '',
      }
    },

    methods: {
      validateUsername () {
        return !/[^A-z0-9_\- \.]/.test(this.username)
      },

      validatePassword () {
        return this.password.length >= 6 
      },

      validateConfirmPassword () {
        return this.confirmPassword === this.password
      },

      submit () {
        const {
          username, 
          password, 
        } = this

        const { rsa } = this.$store.state

        this.api('/api/users/new', { 
          method: 'post', 
          data: {
            username, 
            password,
            publicKey: rsa.public.key,
          },
        }).then(console.log)
      },
    },

    computed: {
      valid () {
        return this.validateUsername() && this.validatePassword() && this.validateConfirmPassword()
      },
    },
  }
</script>

<style lang="sass" scoped>
  @import '../sass/form'
</style>

<template lang="pug">
  .form.login
    h1 Sign up

    Input( placeholder="email or phone number" v-model="username" icon="user" )
    Input( placeholder="password" type="password" v-model="password" icon="lock" )
    Input( placeholder="confirm password" type="password" v-model="password" icon="lock" )

    button.fill( :disabled="!valid" @click="submit" )
      span Submit

    p.subtext 
      span Already have an account? 
      router-link( to="/login" ) Log in
</template>

<script>
  import Input from '@/components/Input'

  export default {
    data () {
      return {
        username: '',
        password: '',
        confirmPassword: '',
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

      validateConfirmPassword () {
        return this.confirmPassword === this.password
      },

      submit () {
        const {
          username, 
          password, 
        } = this

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

<template>
  <dir>
    <h1>Sign in</h1>
    <v-text-field
      v-model="auth.email"
      label="Login"
      name="login"
      prepend-icon="mdi-account"
      type="text"
    />

    <v-text-field
      v-model="auth.password"
      label="Password"
      name="password"
      prepend-icon="mdi-lock"
      type="password"
    />
    <v-btn
      class="login-button"
      depressed
      large
      @click="login"
    >
      Login
    </v-btn>
    <v-snackbar
      v-model="snackbar"
      :timeout="4000"
      absolute
      bottom
      center
    >
      {{ snackbarText }}
    </v-snackbar>
  </dir>
</template>

<script>
export default {
  data: () => ({

    snackbar: false,
    snackbarText: 'No error message',
    auth: {
      email: '',
      password: ''
    }
  }),
  methods: {
    login () {
      this.$fire.auth.signInWithEmailAndPassword(this.auth.email, this.auth.password)
        .then((cre) => {
          console.log('登入成功:', cre)
          this.snackbarText = '登入成功:' + cre.user
          this.snackbar = true
        })
        .catch((error) => {
          this.snackbarText = error.message
          this.snackbar = true
        })
    }
  }

}
</script>

<style>

</style>

<template>
  <v-app>
    <v-main class="mycontainer">
      <v-container>
        <div v-if="$fire.auth.currentUser">
          {{ $store.state.user || $fire.auth.currentUser.email }} 已登入。<a href="/auth/signout">登出</a>
        </div>
        <div v-else>
          尚未登入。 <a href="/auth/signin">登入</a>
        </div>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created () {
  }
}
</script>
<style>

.mycontainer{
  background: linear-gradient(45deg, #2193b0 0%, #6dd5ed 100%);
}
</style>

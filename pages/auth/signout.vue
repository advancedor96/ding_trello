<template>
  <h1>Sign out</h1>
</template>

<script>
export default {
  asyncData () {
    console.log('執行 async data')
    // this.$fire.auth.signOut()
  },
  created () {
    this.$fire.auth.signOut()
  }
}
</script>

<style>

</style>

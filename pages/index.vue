<template>
  <div>
    <v-dialog v-model="dialog" max-width="355" persistent>
      <v-container class="d-block">
        <v-icon @click="dialog = false">
          mdi-close
        </v-icon>
        <v-text-field
          v-model="board.title"
          label="Board title"
        />
      </v-container>
      <v-btn @click="createBoard">
        Submit
      </v-btn>
    </v-dialog>
    <h1>My Boards</h1>
    <v-btn small depressed @click="addBoard">
      ADD BOARD
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    board: {
      title: ''
    }
  }),
  methods: {
    addBoard () {
      this.dialog = true
    },
    createBoard () {
      console.log('按了', this.$fire.firestore)
      this.$fire.firestore
        .collection('myStuts')
        .doc('3').set({ name: 'peter2' })
        .then(() => {
          console.log('完成')
        })
      //   .doc(this.$fire.auth.currentUser.uid)
      //   .collection('boards')
      // .doc('3')
    }
  }
}
</script>

<style>

</style>

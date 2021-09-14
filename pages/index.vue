<template>
  <div>
    <v-dialog v-model="dialog" max-width="355" persistent>
      <v-card>
        <v-card-title class="d-flex justify-space-between">
          <span>Add borad</span>
          <v-icon @click="dialog = false">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="board.title" label="Board title" />
          <v-text-field v-model="board.color" label="Board color" />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="createBoard">
            送出
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <h1>My Boards</h1>
    <v-btn small depressed @click="addBoard">
      ADD BOARD
    </v-btn>
    <div class="d-flex flex-wrap">
      <p v-if="boards.length ===0">
        目前沒有看板
      </p>
      <v-card v-for="(b, idx) in boards" :key="idx" class="jello-board-tile">
        <v-card-title>{{ b.title }} </v-card-title>
        <v-card-subtitle>{{ b.color }} </v-card-subtitle>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    board: {
      title: '',
      color: ''
    },
    boards: []
  }),
  created () {

  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      this.boards = []
      this.$fire.firestore
        .collection(`users/${this.$store.state.user}/boards/`)
        .get()
        .then((doc) => {
          doc.docs.forEach((el) => {
            this.boards.push(el.data())
          })
        })
    },
    addBoard () {
      this.dialog = true
    },
    createBoard () {
      this.$fire.firestore
        .collection('users')
        .doc(this.$fire.auth.currentUser.email)
        .collection('boards')
        .doc(this.board.title)
        .set(this.board)
        .then(() => {
          this.dialog = false
          this.load()
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

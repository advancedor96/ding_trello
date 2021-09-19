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
          <v-color-picker
            v-model="board.color"
            dot-size="25"
            hide-inputs
            swatches-max-height="100"
          />
          <v-text-field v-model="board.color" label="Board color" />
          <input
            type="file"
            accept="jpg, jpeg, png"
            @change="onFileSelected($event)"
          >
        </v-card-text>
        <v-card-actions>
          <v-btn @click="createBoard">
            送 出
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <h1>My Boards</h1>
    <v-btn small depressed @click="addBoard">
      ADD BOARD
    </v-btn>
    <div class="d-flex flex-wrap">
      <p v-if="boards.length === 0">
        目前沒有看板
      </p>
      <v-card
        v-for="(b, idx) in boards"
        :key="idx"
        class="jello-board-tile dark"
        :dark="b.isDark"
        :style="
          b.image && b.image.downloadURL? `background:url(${b.image.downloadURL})`:
          b.color.startsWith('#')? `background-color:${b.color}`: null "
        @click="$router.push('/board/' + b.id)"
      >
        <v-card-title>
          {{ b.title }}
          <v-menu offset-y>
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="deleteBoard(b.title)">
                <v-list-item-title>刪 除</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-title>
      </v-card>
    </div>
  </div>
</template>

<script>
import tinycolor from 'tinycolor2'
import { v4 as uuidv4 } from 'uuid'
export default {
  data: () => ({
    dialog: false,
    board: {
      id: '',
      title: '',
      color: '',
      image: {
        downloadURL: ''
      }
    },
    boards: []
  }),
  created () {
  },
  mounted () {
    window.t = tinycolor
    this.load()
  },
  methods: {
    onFileSelected (event) {
      console.log('on file selected')
      const file = event.target.files[0]
      console.log('file', file)
      const uploadTask = this.$fire.storage.ref(`images/${this.$store.state.user}/boards/${this.board.title}/${file.name}`).put(file)
      uploadTask.on('state_changed', (snapshot) => {
        console.log('上傳中....')
      }, (err) => {
        console.log('上傳錯誤:', err)
      }, async () => {
        const url = await uploadTask.snapshot.ref.getDownloadURL()
        console.log('下載連結：', url)
        this.board.image.downloadURL = url
        this.board.color = ''
      })
    },
    deleteBoard (title) {
      this.$fire.firestore
        .collection(`users/${this.$store.state.user}/boards/`)
        .doc(title)
        .delete()
        .then(() => {
          this.load()
        })
        .catch((err) => {
          console.log('刪除時發生錯誤', err)
        })
    },
    load () {
      this.boards = []
      this.$fire.firestore
        .collection(`users/${this.$store.state.user}/boards/`)
        .get()
        .then((doc) => {
          doc.docs.forEach((el) => {
            this.boards.push({
              ...el.data(),
              isDark: (el.data().image && el.data().image.downloadURL === '' && tinycolor(el.data().color).isDark())
            })
          })
        })
    },
    addBoard () {
      this.board.id = uuidv4()
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

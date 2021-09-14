const state = () => ({
  user: null
})

const actions = {
  onAuthStateChangedAction (state, { authUser, claims }) {
    if (!authUser) {
      console.log('還沒登入')
      // remove state
      state.commit('SET_USER', null)

      // // redirect from here
      // this.$router.push({
      //   path: '/auth/signin'
      // })
    } else {
      const { uid, email } = authUser
      console.log('剛剛登入, email:', email, 'uid:', uid)
      state.commit('SET_USER', email)
      // state.commit('SET_USER', {
      //   uid,
      //   email
      // })
    }
  }
}

const mutations = {
  SET_USER (state, user) {
    console.log('設定vuex變數:', user)
    state.user = user
  }
}

const getters = {
  getUser (state) {
    return state.user
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}

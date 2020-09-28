export const state = () => ({
  user: {},
  messages: [],
  users: [],
  warzone: '',
})

export const getters = {
  typingUsers: ({ users, user }) =>
    users.filter(({ typingStatus, id }) => typingStatus && user.id !== id),
  typingStatus: ({ user }) => user.typingStatus,
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setVideo(state, video) {
    state.user.video = video
  },
  SOCKET_newMessage(state, msg) {
    state.messages = [...state.messages, msg]
  },
  SOCKET_updateUsers(state, users) {
    state.users = users
  },
  SOCKET_warzoneUpdated(state, text) {
    state.warzone = text
  },
  clearData(state) {
    state.user = {}
    state.messages = []
    state.users = []
  },
  setTypingStatus(state, status) {
    state.user.typingStatus = status
  },
}

export const actions = {
  socketEmit(_, { action, payload }) {
    return this._vm.$socket.emit(action, payload)
  },
  createMessage({ dispatch, state }, msg) {
    const { user } = state
    const payload = {
      msg,
      id: user.id,
      user: user.name,
    }

    dispatch('socketEmit', {
      action: 'createMessage',
      payload,
    })
  },
  joinRoom({ dispatch, state }) {
    const { user } = state

    dispatch('socketEmit', {
      action: 'joinRoom',
      payload: user,
    })
  },
  leftRoom({ commit, dispatch }) {
    dispatch('socketEmit', {
      action: 'leftChat',
      payload: null,
    })

    commit('clearData')
  },
  setTypingStatus({ dispatch, commit, state }, typingStatus) {
    commit('setTypingStatus', typingStatus)
    const { user } = state
    dispatch('socketEmit', {
      action: 'setTypingStatus',
      payload: user,
    })
  },
  updateWarzone({ dispatch, commit, state }, payload) {
    commit('SOCKET_warzoneUpdated', payload.text)
    dispatch('socketEmit', {
      action: 'updateWarzone',
      payload,
    })
  },
  async createUser({ commit, dispatch }, user) {
    const { id } = await dispatch('socketEmit', {
      action: 'createUser',
      payload: user,
    })
    commit('setUser', { id, ...user })
  },
  async startVideo({ commit, dispatch }, { video, room }) {
    await dispatch('socketEmit', {
      action: 'startVideo',
      payload: { video, room },
    })
    commit('setVideo', video)
  },
  SOCKET_reconnect({ state, dispatch }) {
    const { user } = state
    if (Object.values(user).length) {
      const { id, ...userInfo } = user
      dispatch('createUser', userInfo)
      dispatch('joinRoom')
    }
  },
}

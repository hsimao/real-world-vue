export const namespaced = true

export const state = {
  loading: 0
}

export const mutations = {
  START_LOADING: start => start.loading++,
  FINISH_LOADING: start => start.loading--
}

export const getters = {
  loading: state => state.loading
}

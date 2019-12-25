export const state = () => ({
  pageData: {}
})

export const mutations = {
  loadPageData (state, payload) {
    state.pageData = {
      ...payload
    }
  }
}

export const getters = {
}

export const actions = {
}

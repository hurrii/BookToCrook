export const state = () => ({
  pageData: {},
  searchResultsData: {}
})

export const mutations = {
  savePageData (state, payload) {
    state.pageData = {
      ...payload
    }
  },
  saveSearchResults (state, payload) {
    state.searchResultsData = {
      ...payload
    }
  }
}

export const getters = {
}

export const actions = {
}

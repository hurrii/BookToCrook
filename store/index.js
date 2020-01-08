export const state = () => ({
  pageData: {},
  categories: [
    {
      id: 1,
      name: 'fiction',
      title: 'Художественная литература'
    },
    {
      id: 2,
      name: 'nonfiction',
      title: 'Научно-популярная литература'
    },
    {
      id: 3,
      name: 'business',
      title: 'Бизнес-литература'
    },
    {
      id: 4,
      name: 'comic+books',
      title: 'Комиксы'
    },
    {
      id: 5,
      name: 'parents+and+kids',
      title: 'Детям и родителям'
    }
  ]
})

export const mutations = {
  savePageData (state, payload) {
    state.pageData = {
      ...payload
    }
  }
}

export const getters = {
  getCategories: (state, getters, rootState) => {
    return state.categories
    // return state.categories.filter(category => category.name === rootState.route.name)
  }
}

export const actions = {
}

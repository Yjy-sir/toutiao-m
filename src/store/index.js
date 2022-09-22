import Vue from 'vue'
import Vuex from 'vuex'

import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY)
  },
  // 通过mutations 修改 state 数据第一个参数为固定写法
  // user 接收的是 token
  mutations: {
    setUser (state, user) {
      state.user = user
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})

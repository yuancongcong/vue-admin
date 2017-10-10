import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  breadcrumb: null, //面包屑
  user:null,
  menus:null,
  menuMap:null,
  curMenu: null, //当前菜单
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})

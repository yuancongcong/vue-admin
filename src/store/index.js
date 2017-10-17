import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  loading:false,
  breadcrumb: null, //面包屑
  user: null,
  menus: null,
  curMenu: null, //当前菜单
  get menuMap() {
    if (!this.menus) return null;
    return toMap({}, this.menus)
  },
  get menuList() {
    if (!this.menus) return null;
    return toArray([], this.menus)
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})


function toMap(menuMap, menus, parent) {
  menus.forEach(v => {
    menuMap[v.url] = v;
    v.parent = parent
    if (v.children) {
      toMap(menuMap, v.children, v);
    }
  })
  return menuMap;
}

function toArray(array, menus, parent) {
  menus.forEach(v1 => {
    let v = { ...v1}
    array.push(v);
    if (parent && parent.pids) {
      v.pids = [...parent.pids, parent.id];
    } else {
      v.pids = [];
    }
    if (v.children) {
      toArray(array, v.children, v);
    }
  })
  return array;
}

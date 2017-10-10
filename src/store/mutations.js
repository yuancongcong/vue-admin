import {
  RECORD_USERINFO,
  INIT_USERINFO,
  USER_LOGOUT,
  GET_ORG_LIST,
  GET_CUR_MENU,
} from './mutation-types.js'

import {
  setStore,
  getStore,
  removeStore,
  setToken,
} from '../config/mUtils'

export default {
  //记录用户本地信息
  [RECORD_USERINFO](state, {
    token,
    user,
    menus
  }) {
    state.login = true;
    setStore('user', user)
    setStore('menus', menus)
    setToken(token);
  },
  //初始化用户信息
  [INIT_USERINFO](state) {
    state.user = getStore('user', 'json');
    state.menus = getStore('menus', 'json');
    state.menuMap = toMap({},state.menus);
  },
  [USER_LOGOUT](state, info) {
    setToken('');
    removeStore('user')
    removeStore('menus')
  },
  [GET_ORG_LIST](state, data) {
    state.orgList = data
  },
  [GET_CUR_MENU](state, path) {
    let menu = state.curMenu = state.menuMap[path];
    const breadcrumb = [];
    while (menu) {
      breadcrumb.push(menu);
      menu = menu.parent;
    }
    state.breadcrumb = breadcrumb.reverse();
  }
}


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

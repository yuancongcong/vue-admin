import {
  RECORD_USERINFO,
  INIT_USERINFO,
  USER_LOGOUT,
  GET_ORG_LIST,
  GET_CUR_MENU,
  GET_MENU_LIST
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
  },
  [USER_LOGOUT](state, info) {
    setToken('');
    removeStore('user')
    removeStore('menus')
  },
  [GET_ORG_LIST](state, data) {
    state.orgList = data
  },
  [GET_MENU_LIST](state, menus) {
    state.menus = menus
    setStore('menus', menus)
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

import {
  GET_ORG_LIST,
  GET_CUR_MENU,
  GET_MENU_LIST
} from './mutation-types.js'
import {
  getList as getListByOrg
} from 'src/service/org'
import {
  getList as getListByMenu
} from 'src/service/menu'



export default {
  async getOrgList({state,commit}) {
    let list = await getListByOrg();
    commit(GET_ORG_LIST, list)
  },
  async getMenuList({state,commit}) {
    try{
      state.loading = true;
      let list = await getListByMenu();
      commit(GET_MENU_LIST, list)
    }finally{
      state.loading = false;
    }
  },
  async getCurMenu({state,getters,commit},path) {
    const menuMap  = state.menuMap;
    const cur = menuMap[path];
    commit(GET_CUR_MENU, cur)
  },
}

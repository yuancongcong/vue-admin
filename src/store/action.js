import {
  GET_ORG_LIST,
  GET_CUR_MENU,
} from './mutation-types.js'
import {
  getList
} from 'src/service/org'




export default {
  async getOrgList({state,commit}) {
    let list = await getList();
    commit(GET_ORG_LIST, list)
  },
  async getCurMenu({state,getters,commit},path) {
    const menuMap  = state.menuMap;
    const cur = menuMap[path];
    commit(GET_CUR_MENU, cur)
  },
}

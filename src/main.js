import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router/router'
import store from './store'
import {
  routerMode
} from './config/env'
import './config/api'
import {
  getToken
} from './config/mUtils'
import ElementUI from 'components/element-ui'

import './mock'

Vue.use(VueRouter)
Vue.use(ElementUI)


Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: routerMode
})

//登录拦截
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!getToken()) {
      return next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
  next() // 确保一定要调用 next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

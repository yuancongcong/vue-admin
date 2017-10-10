//vue项目优化之按需加载组件-使用webpack require.ensure
const login = r => require.ensure([], () => r(require('../page/login')), 'index')
const index = r => require.ensure([], () => r(require('../page')), 'index')
const _404 = r => require.ensure([], () => r(require('../page/common/404')), 'index')
const empty = r => require.ensure([], () => r(require('../page/common/empty')), 'index')

import system from './system'
import dashboard from './dashboard'

//子路由
const children = [{
    path: '',
    redirect: '/dashboard'
  },
  //我的面板
  {
    path: 'dashboard',
    component: empty,
    children: dashboard
  },
  {
    path: 'system',
    component: empty,
    children: system
  },
]

// 配置路由
export default [{
  path: '/login',
  component: login,
  meta: {
    requireAuth: false
  }
}, {
  path: '/',
  component: index,
  children: children,
}, {
  path: '*',
  component: _404
}, ]

const user = r => require.ensure([], () => r(require('../page/system/user')), 'system')

// 配置路由
export default [{
    path: '',
    redirect:'user'
  },
  {
    path: 'user',
    component: user,
  },
  {
    path: 'org',
    component: user,
  }
]

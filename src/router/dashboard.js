const info = r => require.ensure([], () => r(require('../page/dashboard/info')), 'dashboard')
const changePassword = r => require.ensure([], () => r(require('../page/dashboard/changePassword')), 'dashboard')

// 配置路由
export default [{
    path: '',
    redirect:'info'
  },{
    path: 'info',
    meta: {
      nav: '个人信息',
    },
    component: info,
  },
  {
    path: 'changePassword',
    meta: {
      nav: '修改密码',
    },
    component: changePassword,
  }
]

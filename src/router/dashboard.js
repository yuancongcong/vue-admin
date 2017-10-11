// 我的面板
export default [{
    path: '',
    redirect: 'info'
  }, {
    path: 'info',
    component: r => require(['../page/dashboard/info'], r),
  },
  {
    path: 'changePassword',
    component: r => require(['../page/dashboard/changePassword'], r)
  }
]

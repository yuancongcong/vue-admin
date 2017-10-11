// 系统配置
export default [{
    path: '',
    redirect: 'user'
  },
  {
    path: 'user',
    component: r => require(['../page/system/user'], r),
  },
  {
    path: 'org',
    component: r => require(['../page/system/user'], r),
  }
]

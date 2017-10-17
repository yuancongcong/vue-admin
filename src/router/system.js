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
    path: 'menu',
    component: r => require(['../page/system/menu'], r),
  }
]

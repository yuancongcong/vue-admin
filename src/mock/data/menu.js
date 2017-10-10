export default [{
    id: 0,
    name: '我的面板',
    icon: 'fa-dashboard',
    url: '/dashboard',
    children: [{
      id: 2,
      name: '个人信息',
      icon: 'fa-user',
      url: '/dashboard/info'
    }, {
      id: 3,
      name: '修改密码',
      icon: 'edit',
      url: '/dashboard/changePassword'
    }]
  },
  {
    id: 5,
    name: '系统管理',
    icon: 'setting',
    url: '/system',
    children: [{
        id: 3,
        name: '用户管理',
        icon: 'menu',
        url: '/system/user'
      }, {
        id: 5,
        name: '组织管理',
        icon: 'menu',
        url: '/system/org'
      }, {
        id: 2,
        name: '菜单管理',
        icon: 'menu',
        url: '/system/menu'
      }, {
        id: 4,
        name: '角色管理',
        icon: 'menu',
        url: '/system/role'
      }, {
        id: 2,
        name: '日志查询',
        icon: 'menu',
        url: '/system/log',
        children: [{
          id: 2,
          name: '日志查询',
          icon: 'menu',
          url: '/system/log'
        }, {
          id: 3,
          name: '定时任务',
          icon: 'menu',
          url: '/system/task'
        }]
      },

    ]
  },
]

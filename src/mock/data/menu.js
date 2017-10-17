import {
  Random
} from 'mockjs';

const Menus = [{
    id: Random.guid(),
    name: '我的面板',
    icon: 'fa-dashboard',
    url: '/dashboard',
    children: [{
      id: Random.guid(),
      name: '个人信息',
      icon: 'fa-user',
      url: '/dashboard/info'
    }, {
      id: Random.guid(),
      name: '修改密码',
      icon: 'edit',
      url: '/dashboard/changePassword'
    }]
  },
  {
    id: Random.guid(),
    name: '系统管理',
    icon: 'setting',
    url: '/system',
    children: [{
        id: Random.guid(),
        name: '用户管理',
        icon: 'menu',
        url: '/system/user'
      }, {
        id: Random.guid(),
        name: '菜单管理',
        icon: 'menu',
        url: '/system/menu'
      }, {
        id: Random.guid(),
        name: '组织管理',
        icon: 'menu',
        url: '/system/org'
      }, {
        id: Random.guid(),
        name: '角色管理',
        icon: 'menu',
        url: '/system/role'
      }, {
        id: Random.guid(),
        name: '日志查询',
        icon: 'menu',
        url: '/system/log',
        children: [{
          id: Random.guid(),
          name: '日志查询',
          icon: 'menu',
          url: '/system/log'
        }, {
          id: Random.guid(),
          name: '定时任务',
          icon: 'menu',
          url: '/system/task'
        }]
      },

    ]
  },
]


function toMap(menuMap, menus, parent) {
  menus.forEach(v => {
    menuMap[v.id] = v;
    v.level = parent ? parent.level + 1 : 1;
    if (parent && parent.pids) {
      v.pids = [...parent.pids, parent.id];
    } else {
      v.pids = [];
    }
    if (v.children) {
      toMap(menuMap, v.children, v);
    }
  })
  return menuMap;
}
const mapMenu = toMap({}, Menus)
export {
  Menus,
  mapMenu
}

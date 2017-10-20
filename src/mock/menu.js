import mock from './mock';
import {
  Random
} from 'mockjs';
import {
  Menus,
  mapMenu,
} from './data/menu';

let _Menus = Menus;

const getParams = config => {
  let data = config.data,
    params = {}
  data.split('&').map(res => {
    let ar = res.split('=')
    let key = decodeURIComponent(ar[0]),
      val = decodeURIComponent(ar[1])
    params[key] = isNaN(val) ? val : parseInt(val)
  })
  return params
}


//获取菜单列表
mock.onPost('/menu/list').reply(200, [..._Menus]);

//保存菜单
mock.onPost('/menu/save').reply(config => {
  let {
    id,
    pids,
    name,
    url,
    icon,
    disable,
    remark,
    order
  } = JSON.parse(config.data);
  pids = (pids + '').split(',');

  if (id) {
    let u = mapMenu[id];
    u.pids = pids;
    u.name = name;
    u.url = url;
    u.icon = icon;
    u.disable = disable;
    u.remark = remark;
    u.order = order;
  } else {
    let pmenu = mapMenu[pids[pids.length - 1]];
    if (pmenu && !pmenu.children) {
      pmenu.children = [];
    }
    const menu = {
      id: Random.guid(),
      pids,
      name,
      url,
      icon,
      order,
      disable,
      remark,
    };

    (pmenu ? pmenu.children : _Menus).push(menu);
    mapMenu[menu.id] = menu;
  }
  return new Promise((resolve, reject) => {
    resolve([200, {
      code: 200,
      msg: id ? '修改成功' : '新增成功'
    }]);
  });
});

//批量删除菜单
mock.onPost('/menu/batchremove').reply(config => {
  let {
    ids
  } = JSON.parse(config.data);
  ids = (ids + '').split(',');
  ids.some(id => {
    let u = mapMenu[id];

    let pmenu;
    u.pids && u.pids.some(pid => {
      if (pmenu) {
        pmenu = pmenu.children.filter(v => v.id === pid)[0]
      } else {
        pmenu = _Menus.filter(v => v.id === pid)[0]
      }
    })
    if (pmenu) {
      pmenu.children = pmenu.children.filter(v => v.id !== id)
    } else {
      _Menus = _Menus.filter(v => v.id !== id)
    }
  })

  return new Promise((resolve, reject) => {
    resolve([200, {
      code: 200,
      msg: '删除成功'
    }]);
  });
});

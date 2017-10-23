import mock from './mock';
import {
  Random
} from 'mockjs';
import {
  LoginUsers,
  Users
} from './data/user';

let _Users = Users;

//登录
mock.onPost('/login').reply(config => {
  let {
    username,
    password
  } = JSON.parse(config.data);
  return new Promise((resolve, reject) => {
    let user = null;
    LoginUsers.some(u => {
      if (u.username === username && u.password == password) {
        user = JSON.parse(JSON.stringify(u));
        user.password = undefined;
      }
    });

    if (user) {
      resolve([200, {
        code: 200,
        msg: '请求成功',
        token: '123456',
        user
      }]);
    } else {
      resolve([200, {
        code: 500,
        msg: '账号或密码错误'
      }]);
    }
  });
});

//获取用户列表
mock.onPost('/user/changepassword').reply(config => {
  let {
    oldPass,
    newPass,
    reNewPass
  } = JSON.parse(config.data);
  return new Promise((resolve, reject) => {
    if (newPass !== reNewPass) {
      return resolve([200, {
        code: 500,
        msg: '两次密码不一致'
      }]);
    } else {
      let username = 'admin',
        hasUser = LoginUsers.some(u => {
          if (u.username === username && u.password == oldPass) {
            u.password = newPass;
            return true;
          }
        });
      if (hasUser) {
        resolve([200, {
          code: 200,
          msg: '密码修改成功',
        }]);
      } else {
        resolve([200, {
          code: 500,
          msg: '原始密码错误'
        }]);
      }
    }
  });
});

//获取用户列表
mock.onPost('/user/list').reply(config => {
  let {
    name
  } = JSON.parse(config.data);
  let mockUsers = _Users.filter(user => {
    if (name && user.name.indexOf(name) == -1) return false;
    return true;
  });
  return new Promise((resolve, reject) => {
    resolve([200, {
      mockUsers
    }]);
  });
});

//获取用户列表（分页）
mock.onPost('/user/listpage').reply(config => {
  let {
    page,
    pageSize,
    name,
    addr
  } = JSON.parse(config.data);
  let mockUsers = _Users
    .filter(user => !(name && user.name.indexOf(name) == -1))
    .filter(user => !(addr && user.addr.indexOf(addr) == -1));
  let total = mockUsers.length;
  mockUsers = mockUsers.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
  return new Promise((resolve, reject) => {
    resolve([200, {
      total: total,
      resultList: mockUsers
    }]);
  });
});

//批量删除用户
mock.onPost('/user/batchremove').reply(config => {
  let {
    ids
  } = JSON.parse(config.data);
  ids = (ids + '').split(',');
  _Users = _Users.filter(u => !ids.includes(u.id));
  return new Promise((resolve, reject) => {
    resolve([200, {
      code: 200,
      msg: '删除成功'
    }]);
  });
});

//新增用户
mock.onPost('/user/save').reply(config => {
  let {
    id,
    name,
    addr,
    age,
    birth,
    sex
  } = JSON.parse(config.data);

  if (id) {
    _Users.some(u => {
      if (u.id === id) {
        u.name = name;
        u.addr = addr;
        u.age = age;
        u.birth = birth;
        u.sex = sex;
      }
    });
  } else {
    _Users.push({
      id: Random.guid(),
      name,
      addr,
      age,
      birth,
      sex
    });
  }
  return new Promise((resolve, reject) => {
    resolve([200, {
      code: 200,
      msg: id ? '修改成功' : '新增成功'
    }]);
  });
});

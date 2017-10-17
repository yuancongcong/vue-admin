import {
  Random
} from 'mockjs';
const LoginUsers = [{
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: '/static/user.png',
    name: '管理员',
  },
  {
    id: 1,
    username: 'ycc',
    password: '123456',
    avatar: '/static/user.png',
    name: '袁聪聪',
  }
];

const Users = [];

Users.push({
  id: Random.guid(),
  name: Random.cname(),
  addr: '上海 上海市 浦东新区',
  age: Random.integer(18, 60),
  birth: Random.date(),
  sex: Random.pick('male', 'female')
})
Users.push({
  id: Random.guid(),
  name: Random.cname(),
  addr: '上海 上海市 黄浦区',
  age: Random.integer(18, 60),
  birth: Random.date(),
  sex: Random.pick('male', 'female')
})
Users.push({
  id: Random.guid(),
  name: Random.cname(),
  addr: '湖南省 怀化市 鹤城区',
  age: Random.integer(18, 60),
  birth: Random.date(),
  sex: Random.pick('male', 'female')
})

for (let i = 0; i < 86; i++) {
  Users.push({
    id: Random.guid(),
    name: Random.cname(),
    addr: Random.county(true),
    age: Random.integer(18, 60),
    birth: Random.date(),
    sex: Random.pick('male', 'female')
  });
}
export {
  LoginUsers,
  Users
};

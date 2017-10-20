import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

//在初始化模拟调试器的时候，设置几秒的延迟：响应的延迟 
const mock = new MockAdapter(axios, {
  delayResponse: 500
});
// mock success request
mock.onPost('/success').reply(200, {
  msg: 'success'
});

// mock error request
mock.onPost('/error').reply(500, {
  msg: 'failure'
});

export default mock;

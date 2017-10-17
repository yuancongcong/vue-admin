import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);
// mock success request
mock.onPost('/success').reply(200, {
  msg: 'success'
});

// mock error request
mock.onPost('/error').reply(500, {
  msg: 'failure'
});

export default mock;

import axios from 'axios';
import {
  baseUrl
} from './env';

axios.defaults.baseURL = baseUrl;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.response.use(response => response.data);

axios.defaults.transformRequest.unshift(function (data, headersGetter) {
  var key, result = [];
  if (typeof data === "string") {
    return data;
  }
  for (key in data) {
    if (data.hasOwnProperty(key) && data[key] !== undefined && data[key] != null)
    result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
  }
  return result.join("&");
});

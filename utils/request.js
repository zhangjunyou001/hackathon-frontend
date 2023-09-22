import axios from 'axios'
import cookie from 'js-cookie'
import { MessageBox, Message } from 'element-ui'

const service = axios.create({
  baseURL: `http://44.203.136.211:8222`, // api的base_url
  timeout: 20000 // 请求超时时间
})
service.interceptors.request.use(
  config => {

  if (cookie.get('guli_token')) {

    config.headers['token'] = cookie.get('guli_token');
  }
    return config
  },
  err => {
  return Promise.reject(err);
})

export default service

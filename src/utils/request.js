import Vue from 'vue';
import axios from 'axios';
import QS from 'qs';
import * as _ from 'lodash';
import { Loading } from 'element-ui';
Vue.prototype.axios = axios;
import {
  showFailedStatusByAPI,
  showFailedStatusByBrowser,
} from './server.config.js';

// 创建axios实例
const $axios = axios.create();
// 请求超时时间 50s
$axios.defaults.timeout = 1000 * 50;

// 添加全局loading加载动画
let loadingInstance = null;

// request拦截器
$axios.interceptors.request.use(
  (config) => {
    // 启动loading加载动画并规定参数
    loadingInstance = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
    });
    // config.headers['Content-Type'] = 'text/plain';
    // 去除参数中string类型数据首尾的空格,如果数据格式是FormData的，则跳过
    // if (config.data) {
    //   config.data = getParamsByTrimmed(config.data);
    // }
    // 在发送请求之前做些什么 需要携带token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// respone拦截器
$axios.interceptors.response.use(
  (response) => {
    //关闭loading
    loadingInstance.close();
    // 根据后端约定，response.data形式为{code:200, message:string, data:any}
    if (response && response.data) {
      const { code } = response.data;
      if (code) {
        return code === 1000 || code === 200
          ? response.data
          : failedHandler(response.data);
      }
      // response.data没有code,说明是二进制流,直接return
      return response.data;
    }
  },
  (error) => {
    //关闭loading
    console.log('接口报错，关闭loading');
    loadingInstance.close();
    if (error && error.response) {
      // 存在response，一般都是请求接口报错，如403、404、500、504等
      showFailedStatusByBrowser(error.response);
      return Promise.reject(error.response);
    }
  }
);

// 非200状态去 showFailedStatusByAPI 找对应的错误提示
function failedHandler(res) {
  showFailedStatusByAPI(res);
  return Promise.reject(res);
}

/*
 * params: url 接口
 * params: [params, ...args]  params 需要拼接到url上的参数，...args body里的参数
 * description: post接口url自动拼接参数
 * FD: post接口url拼接的参数在后端显示的是form-data格式
 */
$axios.addFDParamsByPost = (url, [params, ...args]) => {
  const search = QS.stringify(params, {
    arrayFormat: 'repeat',
  });
  url = url + '?' + search;
  if (!args.length) {
    // 如果没有剩余参数，需要手动添加一个空对象，body如果没有值接口会报错
    args = [{}];
  }
  return new Promise((resolve, reject) => {
    $axios
      .post(url, ...args)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

/*
 * params: search
 * description: 对参数中的string类型的数据进行.trim()处理
 */
export function getParamsByTrimmed(search) {
  if (Object.prototype.toString.call(search) === '[object FormData]')
    return search;
  const searchData = _.cloneDeep(search);
  const trimParams = (params) => {
    if (!params) return;
    const keys = Object.keys(params);
    if (!keys.length) return params;
    for (const key of keys) {
      const type = typeof params[key];
      switch (type) {
        case 'string':
          params[key] = params[key].trim();
          break;
        case 'object':
          trimParams(params[key]);
          break;
        default:
          break;
      }
    }
    return params;
  };
  return trimParams(searchData);
}

export default $axios;

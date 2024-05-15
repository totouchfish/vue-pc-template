// 结合业务封装
import { Message } from 'element-ui';
import router from '@/router/index';

// 状态码错误信息
const CODE_MESSAGE = {
  200: '服务器成功返回请求的数据。',
  10010: '登录过期，请重新登录',
  401: '尚未登录授权，请登录',
  404: '请求地址出错: 请联系管理员',
  403: '禁止访问，请联系管理员',
  500: '查找失败, 服务器发生错误，或数据异常',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  ECONNABORTED: '请求超时',
  'Network Error': '网络异常',
};

/* title:请求异常处理
 * question1:浏览器异常状态码和后台接口返回的异常异常状态码一起处理了，后期应该分开处理，浏览器的异常状态码处理+接口异常状态码处理
 * question2:而且目前后端的异常状态码都是独立的，压根没有应用浏览器的状态码，有而不用，徒增麻烦 （举个例子，403 forbidden，用户权限不够，禁止访问，后端直接将浏览器的状态码置为403即可，无需再使用浏览器是成功状态码200，然后接口再给一个403状态，这样拦截器还需要多判断一层）
 */
// 接口异常状态码处理
const showFailedStatusByAPI = function (response) {
  const res = response;
  try {
    // 获取报错信息(本地报错提示优先)
    // const message = CODE_MESSAGE[res.code]
    //   ? CODE_MESSAGE[res.code]
    //   : res.message || res.msg;

    // 获取报错信息(服务报错提示优先)
    const msg = res.message || res.msg;
    const message = msg ? msg : CODE_MESSAGE[res.code];
    Message({
      type: 'error',
      message: message,
    });
    handleError(res.code);
    // 感觉没必要再return给request，让它俩耦合上也没什么意义
    // // 直接return，由request.js进行promise处理
    // return res;
  } catch (e) {
    throw Promise.reject(e);
  }
};

// 浏览器的异常状态码处理
const showFailedStatusByBrowser = function (res) {
  try {
    // 获取报错信息
    const message = CODE_MESSAGE[res.status]
      ? CODE_MESSAGE[res.status]
      : res.statusText;
    Message({
      type: 'error',
      message: message,
    });
    handleError(res.status, res);
    // 感觉没必要再return给request，让它俩耦合上也没什么意义
    // // 直接return，由request.js进行promise处理
    // return res;
  } catch (e) {
    throw Promise.reject(e);
  }
};

function handleError(code, res) {
  // code为非200是抛错 可结合自己业务进行修改
  switch (code) {
    case 10010:
      // token过期，退出登录并刷新页面
      location.reload();
      break;
    case 401:
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath,
        },
      });
      break;
    case 403:
      // router.push('/login');
      break;
    case 302:
      handleRedirect(res);
      break;
    default:
      break;
  }
}

function handleRedirect(res) {
  console.log(res);
  alert('捕获到浏览器状态302，准备进行重定向跳转！');
}

export { showFailedStatusByAPI, showFailedStatusByBrowser };

import $http from '@/utils/request';

const API = {
  // 登录
  login(params) {
    return $http.post('/api/login', params);
  },
};
export default API;

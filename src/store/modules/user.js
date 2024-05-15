import API from '@/api/login';
import router, { resetRouter } from '@/router';
import { getUrlKey } from '@/utils/getUrlKey';
const state = {
  token: '',
  user: {},
  dept: {},
  roles: [], // 角色
};

const mutations = {
  SET_TOKEN: (state, token) => {
    // 设置token
    state.token = token;
  },
  SET_USER: (state, user) => {
    // 设置用户信息
    state.user = user;
  },
  SET_DEPT: (state, dept) => {
    // 设置部门信息
    state.dept = dept;
  },
  SET_ROLES: (state, roles) => {
    // 设置用户角色
    state.roles = roles;
  },
};

const actions = {
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      // API.getUserInfo()
      //   .then((res) => {
      //     const _data = res.data;
      //     const deptInfo = {
      //       deptId: _data.dept.deptId,
      //       deptCode: _data.dept.deptCode,
      //       deptName: _data.dept.deptName,
      //     };
      //     const userInfo = {
      //       userName: _data.userInfo.realName,
      //       account: _data.userInfo.account,
      //       mobile: _data.userInfo.mobile,
      //       userId: _data.userInfo.userId,
      //     };
      commit('SET_USER', userInfo);
      //     commit('SET_DEPT', deptInfo);
      resolve();
      //   })
      //   .catch((error) => {
      //     reject(error);
      //   });
    });
  },
  // 获取用户角色
  getRoles({ commit }) {
    return new Promise((resolve, reject) => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      commit('SET_ROLES', [userInfo.role]);
      // API.getUserRoles()
      //   .then((res) => {
      //     console.log(res.data && res.data.length > 1);
      //     if (!(res.data && res.data.length > 0)) {
      //       reject();
      //     }
      //     const roles = res.data.map((item) => {
      //       return item.roleEn;
      //     });
      //     // admin 部门管理员
      //     // audit 部门审核员
      // commit('SET_ROLES', roles);
      resolve();
      //   })
      //   .catch(() => {
      //     reject();
      //   });
    });
  },
  JudgeToken() {
    let urlObj = getUrlKey();
    let arrKeys = Object.keys(urlObj);
    if (arrKeys.length > 0 && arrKeys.includes('token')) {
      localStorage.setItem('token', urlObj.token);
    }
    const token = localStorage.getItem('token');
    if (urlObj.token || token) {
      router.push('/home');
    } else {
      getURL();
    }
  },
  // 跳转单点登录页面
  JumpLoginPage() {
    getURL();
  },
  // 获取用户信息异常导致的退出程序的操作
  exit({ commit }, token, data) {
    // commit('SET_PERMISSIONS', [])
    commit('SET_TOKEN', token);
    commit('SET_USER', {});
    commit('SET_ROLES', []);
    // removeSession('token-test');
    setTimeout(function () {
      if (data.content) {
        window.location = data.content;
      } else {
        location.reload();
      }
    }, 500);
    resetRouter();
  },
  // 退出的操作
  loginExit({ commit, state }) {
    window.location.href = '/punishment/auth/login';
  },

  // 清除当前账号的所有信息
  resetAccountInfo({ commit }) {
    return new Promise((resolve) => {
      commit('SET_USER', {});
      commit('SET_DEPT', {});
      commit('SET_ROLES', []);
      localStorage.removeItem('token');
      resetRouter();
      resolve();
    });
  },
};

function getURL() {
  API.getTy()
    .then((res) => {
      if (res.code === 200 && res.data) {
        window.location.href = res.data;
      } else {
        console.error('跳转单点登录失败!');
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

import { asyncRoutes, constantRoutes } from '@/router';
import store from '../index';
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */

function hasRoles(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.some((item) => roles.includes(item));
  }
  return true;
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];
  routes.forEach((route) => {
    const tmp = {
      ...route,
    };
    if (hasRoles(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });
  return res;
}

const state = {
  routes: [],
  addRoutes: [],
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
};

const actions = {
  generateRoutes({ commit }) {
    return new Promise((resolve) => {
      let accessedRoutes = [];
      accessedRoutes = filterAsyncRoutes(asyncRoutes, store.getters.roles);
      // 添加404,放在动态路由里,而不放在静态路由里的原因是，如果放在静态路由里，动态路由还未添加到路由中的时，进行页面跳转的时候，首先是查不到对应的路由的，但此时404存在静态路由中，已经加载好了，所以直接就跳转到了404页面。
      accessedRoutes.push({
        path: '*',
        redirect: '/404',
      });
      commit('SET_ROUTES', accessedRoutes);
      resolve(accessedRoutes);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

const getters = {
  token: (state) => state.user.token,
  user: (state) => state.user.user, // 用户信息
  dept: (state) => state.user.dept, // 用户信息
  roles: (state) => state.user.roles, // 用户角色
  addRoutes: (state) => state.permission.addRoutes, // routes
};
export default getters;

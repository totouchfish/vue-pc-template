import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/views/layout'; // 公用布局
import modulesRouters from './modules'; // 引入所有模块路由, 路由模块化

Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: 'home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home.vue'),
        name: 'home',
        meta: {
          title: '首页',
          icon: 'el-icon-menu',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/components/ErrorPages/404.vue'),
    hidden: true,
  },
];

const errorRoutes = [
  {
    path: '*',
    redirect: '/404',
  },
];
export const asyncRoutes = [...modulesRouters];

export const createRouter = () =>
  new VueRouter({
    mode: 'hash', // history后端支持可开
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: [...constantRoutes, ...modulesRouters, ...errorRoutes], // 可根据业务动态加载路由
  });
const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;

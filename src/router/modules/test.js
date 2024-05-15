import Layout from '@/views/layout'; // 公用布局

const testMds = [
  {
    path: '/test',
    name: 'test',
    component: Layout,
    redirect: '/test/test1',
    meta: {
      title: '测试',
      icon: 'el-icon-menu',
    },
    children: [
      {
        path: 'test1',
        nam: 'test1',
        component: () => import('@/views/test/test1.vue'),
        meta: {
          title: '测1s',
          icon: 'el-icon-menu',
        },
      },
      {
        path: 'test2',
        name: 'test2',
        component: () => import('@/views/test/test2.vue'),
        meta: {
          title: '测2s',
          icon: 'el-icon-menu',
        },
      },
    ],
  },
];
export default testMds;

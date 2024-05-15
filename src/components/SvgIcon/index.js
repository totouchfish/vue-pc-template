import Vue from 'vue';
import SvgIcon from './svgIcon.vue';
// 全局注册组件
Vue.component('svg-icon', SvgIcon);
// 定义一个加载目录的函数
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
/**
 * require.context是什么？
 * 一个webpack的api,通过执行require.context函数获取一个特定的上下文,
 * 主要用来实现自动化导入模块（遍历文件夹的文件，从中获取指定文件，自动导入模块）
 * 在前端工程中,一个文件夹中的模块需要频繁引用时可以使用该中方式一次性引入
 * 可以使用这个api,它会遍历文件夹中的指定文件,
 * 然后自动导入,使得不需要每次显式的调用import导入模块
 */
const req = require.context('@/assets/svg', false, /\.svg$/);
// 加载目录下的所有 svg 文件
requireAll(req);

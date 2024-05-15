import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'normalize.css/normalize.css'; // reset browers css
import './assets/styles/index.less'; // less style
import '@/utils/VeeValidate/index.js'; // 自定义表单验证组件
import './plugins/element.js';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

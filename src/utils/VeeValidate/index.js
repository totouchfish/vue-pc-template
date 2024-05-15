import Vue from 'vue';
import { ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

// 引入必填验证
extend('required', {
  ...required,
});

// 自定义规则
import './customValidate';

import Validate from '@/components/Validate';
Vue.component('Validate', Validate);
// 全局注册
// Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

import { localize, extend, validate } from 'vee-validate';
// import {
//   checkSiteName
// } from '@/api/site.js';
// VeeValidate语言包切换,放自定义提示前
// import API from '@/api/site';
import zhCN from 'vee-validate/dist/locale/zh_CN.json';
localize('zh_CN', zhCN);
// 自定义提示
const dictionary = {
  zh_CN: {
    messages: {
      required: '此项为必填项',
    },
    fields: {
      siteName: {
        required: '请输入站点名称',
      },
      siteUrl: {
        required: '请输入站点地址',
      },
      sort: {
        required: '请输入排序内容',
      },
      isWork: {
        required: '请选择是否有效',
      },
      isRelease: {
        required: '请选择是否在工LOGO作门户发布',
      },
      logoUrl: {
        required: '请上传LOGO',
      },
    },
  },
};

localize(dictionary);

// // 自定义规则
// // 姓名
// Validator.extend('userName', {
//   getMessage: field => field + 'sth must be English', // 默认英文
//   validate: value => {
//     return /^[\u4e00-\u9fa5]+$/.test(value);
//   }
// });

// 手机号码校验
extend('mobile', (value) => {
  let res =
    value.length === 11 &&
    /^(13[0-9]|14[5-9]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[189])\d{8}$/.test(
      value
    );
  return res ? true : '请输入11位合法手机号';
});

// // 站点名称校验
// extend('checkSiteName', async value => {
//   let res = await checkSiteName(value);
//   return res ? true : '此站点名称已被使用，请重新输入！';
// });

// async function checkSiteName(name) {
//   let formData = new FormData();
//   formData.append('websiteName', name.trim());
//   let res = await API.findWebSiteName(formData);
//   return res.code === 200;
// }

export default localize;

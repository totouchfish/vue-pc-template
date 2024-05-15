export function getUrlKey(name, url) {
  // return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null

  let obj = {};
  // 获取url参数部分 大概长这样 ?token=213123&a=b
  let urls = window.location.href;
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = urls.match(reg);
  if (arr) {
    arr.forEach((item) => {
      // 把字符串?token=123 转为数组 [token, 123]
      let tempArr = item.substring(1).split('=');
      // decodeURIComponent()可对encodeURIComponent()函数编码的URI进行解码。
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      // 把键值对添加到obj中
      obj[key] = val;
    })
  }
  // return obj.token;
  return obj;
};

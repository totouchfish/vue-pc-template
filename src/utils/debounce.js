/*
 * 防抖函数
 * fn          回调函数
 * wait        等待时间，默认500毫秒
 * immediate   是否立即执行，默认否
 */
export function Debounce(fn, wait = 500, immediate = false) {
  let timer, ctx, argument, timestamp;
  const later = () => {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;
    // 正常情况下last应该是大于0的，但是通过打印last可以看到last可能为0，可能间隔时间太短了，js精度丢失造成值为0，然后last就会为0，如果if中没有判断为0的情况，那么走到else中就会立即执行一次函数
    if (last < wait && last >= 0) {
      timer = setTimeout(later, wait - last);
    } else {
      timer = null;
      !immediate && fn.apply(ctx, argument);
    }
  };
  return function (...args) {
    argument = args;
    timestamp = +new Date();
    const callNow = !timer && immediate;
    ctx = this;
    if (!timer) {
      timer = setTimeout(later, wait);
    }
    callNow && fn.apply(ctx, args);
  };
}

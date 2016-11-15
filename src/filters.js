"use strict"

let format = (value) => {
  return value >= 10 ? value : '0' + value
}

/**
 * @param  {[type]} value [date]
 * @return {[type]}       [string]
 */
exports.formatDate = (time, fmt) => {
  var date = new Date(time);
  var o = {
      'M+': date.getMonth() + 1, //月份
      'd+': date.getDate(), //日
      'h+': date.getHours(), //小时
      'm+': date.getMinutes(), //分
      's+': date.getSeconds(), //秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度
      'S': date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
  return fmt;

};

exports.hiddenName = (value) => {
  if (typeof value == 'string') {
    value = value.split('');
    return _.first(value) + '****' + _.last(value);
  }
}

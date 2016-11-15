'use strict'

let Util = {
  getUrlParam: function(name, url) {
    url = url == null ? window.location.href : url;

    var reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(\\s|&|$)', 'i');
    return reg.test(url) ? RegExp.$2.replace(/\+/g, ' ').replace('null', '') : '';
  },

  getBLen: function(str) {
    if (str == null) return 0;
    if (typeof str != "string"){
        str += "";
    }
    return str.replace(/[^\x00-\xff]/g,"01").length;
  },

  /**
   * 数组转为 hash
   * @param  {[type]} data        [description]
   * @param  {[type]} idAttribute [description]
   * @return {[type]}             [description]
   */
  arrayToHash: function(data, idAttribute) {
      var hash = {};
      _.forEach(data, function(value) {
          hash[value[idAttribute]] = value;
      })
      return hash;
  }
}

window.Util = Util;

module.exports = Util;

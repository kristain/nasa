'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import filters from './filters'
import routerMap from './routers'
import FastClick from 'fastclick'

import Util from './util';


try {
  store.set('xx', 'ss');
} catch (e) {
  $.alert('当前浏览器为隐私模式，无法登录，请切换到普通模式');
} finally {

}

Vue.use(VueResource);
Vue.use(VueRouter);


$.ajaxSettings.crossDomain = true;

//实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
//实例化VueRouter
let router = new VueRouter({
    hashbang: false,
    history: true,
    saveScrollPosition: false,
    transitionOnLoad: false,
    abstract: false
});

router.beforeEach(function (transition) {
  if (Util.clipboard) {
    Util.clipboard.destroy();
  }
  transition.next()
})



let app = Vue.extend({});

routerMap(router);

router.start(app, "#app");

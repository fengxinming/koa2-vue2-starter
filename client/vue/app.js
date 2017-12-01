'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import Router from 'vue-router';
import { sync } from 'vuex-router-sync';
// import { MessageBox, Toast, Popup, Switch, Spinner } from 'mint-ui';
// import MessageBox from 'mint-ui/packages/message-box';
// import Toast from 'mint-ui/packages/toast';
// import Popup from 'mint-ui/packages/popup';
// import Switch from 'mint-ui/packages/switch';
import MessageBox from 'mint-ui/lib/message-box';
import Toast from 'mint-ui/lib/toast';
import Popup from 'mint-ui/lib/popup';
import Switch from 'mint-ui/lib/switch';
import Spinner from 'mint-ui/lib/spinner';
import CSelect from './components/c-select';
import App from './views/layout';
import storagePlugin from './plugins/storage';
Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;
Vue.$toast = Vue.prototype.$toast = Toast;
Vue.component(Popup.name, Popup);
Vue.component(Switch.name, Switch);
Vue.component(Spinner.name, Spinner);
Vue.component(CSelect.name, CSelect);

// 加载路由
const routes = [];
let requireContext = require.context('./routers', false, /^\.\/.*\.js$/);
requireContext.keys().forEach((key) => {
  const mod = requireContext(key);
  (mod.__esModule && mod.default ? mod.default : mod)(routes);
});
Vue.use(Router);
const router = new Router({
  strict: process.env.NODE_ENV !== 'production',
  routes: routes,
  mode: 'history',
  base: '/'
});

// 加载vuux
const modules = {};
requireContext = require.context('./stores', true, /^\.\/.*\/index\.js$/);
requireContext.keys().forEach((key) => {
  const mod = requireContext(key);
  modules[key.slice(2, -9)] = mod.__esModule && mod.default ? mod.default : mod;
});
Vue.use(Vuex);
// 产品环境下不能启用严格模式
const strict = process.env.NODE_ENV !== 'production';
const store = new Vuex.Store({
  modules,
  strict,
  plugins: strict ? [createLogger(), storagePlugin()] : [storagePlugin()]
});
sync(store, router);

// 加载过滤器
Vue.use((Vue) => {
  ((requireContext) => {
    const arr = requireContext.keys().map(requireContext);
    (arr || []).forEach((filter) => {
      filter = filter.__esModule && filter.default ? filter.default : filter;
      Object.keys(filter).forEach((key) => {
        Vue.filter(key, filter[key]);
      });
    });
  })(require.context('./filters', false, /^\.\/.*\.js$/));
});

// 加载指令
Vue.use((Vue) => {
  ((requireContext) => {
    const arr = requireContext.keys().map(requireContext);
    (arr || []).forEach((directive) => {
      directive = directive.__esModule && directive.default ? directive.default : directive;
      Object.keys(directive).forEach((key) => {
        Vue.directive(key, directive[key]);
      });
    });
  })(require.context('./directives', false, /^\.\/.*\.js$/));
});

const app = new Vue({
  router,
  store,
  ...App
});

export { app, router, store };

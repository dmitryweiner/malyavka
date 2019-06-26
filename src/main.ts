import Vue from 'vue';
import App from './App.vue';
import router from '@/router.ts';
import store from '@/stores/store.ts';
import BootstrapVue from 'bootstrap-vue';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');

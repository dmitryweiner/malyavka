import Vue from 'vue';
import App from './App.vue';
import router from '@/router.ts';
import BootstrapVue from 'bootstrap-vue';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

new Vue({
    render: (h) => h(App),
    router,
}).$mount('#app');

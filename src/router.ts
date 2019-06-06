import Vue from 'vue';
import Router from 'vue-router';
import MainScreen from '@/views/MainScreen.vue';
import CountDots from '@/views/CountDots.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.VUE_APP_PUBLIC_URL,
    routes: [
        {
            path: '/',
            component: MainScreen,
        },
        {
            path: '/countDots',
            component: CountDots,
        },
    ],
});

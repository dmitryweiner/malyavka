import Vue from 'vue';
import Router from 'vue-router';
import MainScreen from '@/views/MainScreen.vue';
import CountItems from '@/views/CountItems.vue';
import SolveCalculus from '@/views/SolveCalculus.vue';
import GuessFirstLetter from '@/views/GuessFirstLetter.vue';
import TestPictures from '@/views/TestPictures.vue';
import TranslateToEnglish from '@/views/TranslateToEnglish.vue';
import TranslateFromEnglish from '@/views/TranslateFromEnglish.vue';

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
      path: '/countItems',
      component: CountItems,
    },
    {
      path: '/solveCalculus',
      component: SolveCalculus,
    },
    {
      path: '/guessFirstLetter',
      component: GuessFirstLetter,
    },
    {
      path: '/translateToEnglish',
      component: TranslateToEnglish,
    },
    {
      path: '/translateFromEnglish',
      component: TranslateFromEnglish,
    },

    /* Служебное */
    {
      path: '/testPictures',
      component: TestPictures,
    },

  ],
});

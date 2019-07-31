import Vue from 'vue';
import Router from 'vue-router';
import MainScreen from '@/views/MainScreen.vue';
import CountItems from '@/views/CountItems.vue';
import SolveCalculus from '@/views/SolveCalculus.vue';
import GuessFirstLetter from '@/views/GuessFirstLetter.vue';
import TestPictures from '@/views/TestPictures.vue';
import EnglishLearning from '@/views/EnglishLearning.vue';

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
      path: '/englishLearning',
      component: EnglishLearning,
    },

    /* Служебное */
    {
      path: '/testPictures',
      component: TestPictures,
    },

  ],
});

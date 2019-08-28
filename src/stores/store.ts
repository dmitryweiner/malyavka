import Vue from 'vue';
import Vuex from 'vuex';
import countItems from '@/stores/countItems.ts';
import solveCalculus from '@/stores/solveCalculus.ts';
import guessFirstLetter from '@/stores/guessFirstLetter.ts';
import translateToEnglish from '@/stores/translateToEnglish.ts';
import translateFromEnglish from '@/stores/translateFromEnglish.ts';

Vue.use(Vuex);

export const SHOWING_CORRECT_ANSWER_TIMEOUT = 500;
export const SHOWING_WRONG_ANSWER_TIMEOUT = 2500;
export interface RootStore {}

export default new Vuex.Store({
  modules: {
    countItems,
    solveCalculus,
    guessFirstLetter,
    translateToEnglish,
    translateFromEnglish,
  },
  state: {},
  mutations: {},
  actions: {
    playSound({ state }: any, url: string) {
      const sound = new Audio(url);
      sound.play();
    },
  },
} as any);

import Vue from 'vue';
import Vuex from 'vuex';
import countItems, { CountItemsStore } from '@/stores/countItems.ts';
import solveCalculus from '@/stores/solveCalculus.ts';
import guessFirstLetter from '@/stores/guessFirstLetter.ts';
import translateToEnglish from '@/stores/translateToEnglish.ts';
import translateFromEnglish from '@/stores/translateFromEnglish.ts';

Vue.use(Vuex);

export interface RootStore {
  countItems: CountItemsStore;
}

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

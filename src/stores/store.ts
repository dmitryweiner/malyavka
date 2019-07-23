import Vue from 'vue';
import Vuex from 'vuex';
import countItems, { CountItemsStore } from '@/stores/countItems.ts';

Vue.use(Vuex);

export interface RootStore {
  countItems: CountItemsStore;
}

export default new Vuex.Store({
  modules: {
    countItems,
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

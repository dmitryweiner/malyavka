import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';

Vue.use(Vuex);

interface RootStore {
    currentGameIndex: number;
    countDots: CountDotsStore;
}

interface CountDotsStore {
    currentDotsCount: number;
    currentVariants: number[];
}


export default new Vuex.Store({
    modules: {
    },
    state: {
        currentGameIndex: 0,
        countDots: {
            currentDotsCount: 0,
            currentVariants: [],
        },
    },
    mutations: {
    },
    actions: {
    },
} as any);

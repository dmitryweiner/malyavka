import Vue from 'vue';
import Vuex, {ActionContext} from 'vuex';
import { generateRandom, shuffle } from '@/utils/utils.ts';

Vue.use(Vuex);

interface RootStore {
  countDots: CountDotsStore;
}

interface CountDotsStore {
  question: number;
  answers: number[];
}


export default new Vuex.Store({
  modules: {},
  state: {
    countDots: {
      question: 0,
      answers: [],
    },
  },
  mutations: {
    setQuestion(state: RootStore, value: number) {
      state.countDots.question = value;
    },
    setAnswers(state: RootStore, value: number[]) {
      state.countDots.answers = value;
    },
  },
  actions: {
    initQuestion({state, commit, dispatch, getters}: any) {
      const question: number = generateRandom(1, 5, []);
      const answers: number[] = [];

      answers.push(question);
      answers.push(generateRandom(1, 5, answers));
      answers.push(generateRandom(1, 5, answers));
      answers.push(generateRandom(1, 5, answers));
      commit('setQuestion', question);
      commit('setAnswers', shuffle(answers));
    },
  },
} as any);

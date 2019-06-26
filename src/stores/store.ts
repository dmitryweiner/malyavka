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
  statistics: CountDotsStatistics;
}

interface CountDotsStatistics {
  wrong: number;
  correct: number;
}

export default new Vuex.Store({
  modules: {},
  state: {
    countDots: {
      question: 0,
      answers: [],
      statistics: {
        wrong: 0,
        correct: 0,
      },
    },
  },
  mutations: {
    setQuestion(state: RootStore, value: number) {
      state.countDots.question = value;
    },
    setAnswers(state: RootStore, value: number[]) {
      state.countDots.answers = value;
    },
    incWrong(state: RootStore) {
      state.countDots.statistics.wrong++;
    },
    incCorrect(state: RootStore) {
      state.countDots.statistics.correct++;
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

    processAnswer({state, commit, dispatch, getters}: any, userAnswer: number) {
      if (userAnswer === state.countDots.question) {
        commit('incCorrect');
      } else {
        commit('incWrong');
      }
      dispatch('initQuestion');
    },
  },
} as any);

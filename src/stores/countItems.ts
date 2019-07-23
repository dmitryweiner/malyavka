import Vue from 'vue';
import Vuex, {ActionContext} from 'vuex';
import { generateRandom, shuffle } from '@/utils/utils.ts';
import {RootStore} from '@/stores/store';

Vue.use(Vuex);

export interface CountItemsStore {
  question: number;
  answers: number[];
  statistics: CountItemsStatistics;
}

export interface CountItemsStatistics {
  wrong: number;
  correct: number;
}

const MAX_ITEMS = 8;

type CountItemsActionContext = ActionContext<CountItemsStore, RootStore>;

export default {
  namespaced: true,
  state: {
    question: 0,
    answers: [],
    statistics: {
      wrong: 0,
      correct: 0,
    },
  },
  mutations: {
    setQuestion(state: CountItemsStore, value: number) {
      state.question = value;
    },
    setAnswers(state: CountItemsStore, value: number[]) {
      state.answers = value;
    },
    incWrong(state: CountItemsStore) {
      state.statistics.wrong++;
    },
    incCorrect(state: CountItemsStore) {
      state.statistics.correct++;
    },
  },
  actions: {
    initQuestion({state, commit, dispatch, getters}: CountItemsActionContext) {
      const question: number = generateRandom(1, MAX_ITEMS, []);
      const answers: number[] = [];

      answers.push(question);
      answers.push(generateRandom(1, MAX_ITEMS, answers));
      answers.push(generateRandom(1, MAX_ITEMS, answers));
      answers.push(generateRandom(1, MAX_ITEMS, answers));
      commit('setQuestion', question);
      commit('setAnswers', shuffle(answers));
    },

    processAnswer({state, commit, dispatch, getters}: CountItemsActionContext, userAnswer: number) {
      if (userAnswer === state.question) {
        commit('incCorrect');
      } else {
        commit('incWrong');
      }
      dispatch('initQuestion');
    },
  },
};

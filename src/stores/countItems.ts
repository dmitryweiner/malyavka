import Vue from 'vue';
import Vuex, {ActionContext} from 'vuex';
import { generateRandom, shuffle } from '@/utils/utils.ts';
import {RootStore} from '@/stores/store';
import {GuessFirstLetterStore} from '@/stores/guessFirstLetter';

Vue.use(Vuex);

export interface CountItemsStore {
  isShowingAnswer: boolean;
  userAnswer: number;
  question: number;
  answers: number[];
  statistics: CountItemsStatistics;
}

export interface CountItemsStatistics {
  wrong: number;
  correct: number;
}

const MAX_ITEMS = 8;

export enum Sounds {
  WRONG_ANSWER = require('@/assets/sounds/alien.mp3'),
  CORRECT_ANSWER = require('@/assets/sounds/click.mp3'),
}

type CountItemsActionContext = ActionContext<CountItemsStore, RootStore>;

const SHOWING_ANSWER_TIMEOUT = 1500;

export default {
  namespaced: true,
  state: {
    isShowingAnswer: false,
    userAnswer: 0,
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
    setIsShowingAnswer(state: GuessFirstLetterStore, value: boolean) {
      state.isShowingAnswer = value;
    },
    setUserAnswer(state: GuessFirstLetterStore, value: string) {
      state.userAnswer = value;
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
      commit('setUserAnswer', userAnswer);
      if (userAnswer === state.question) {
        commit('incCorrect');
        dispatch('playSound', Sounds.CORRECT_ANSWER, {root: true});
      } else {
        commit('incWrong');
        dispatch('playSound', Sounds.WRONG_ANSWER, {root: true});
      }
      commit('setIsShowingAnswer', true);
      setTimeout(() => {
        commit('setIsShowingAnswer', false);
        dispatch('initQuestion');
      }, SHOWING_ANSWER_TIMEOUT);
    },
  },
};

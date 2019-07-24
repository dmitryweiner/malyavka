import Vue from 'vue';
import Vuex, {ActionContext} from 'vuex';
import { generateRandom, shuffle } from '@/utils/utils.ts';
import {RootStore} from '@/stores/store';

Vue.use(Vuex);

export interface SolveCalculusStore {
  firstValue: number;
  secondValue: number;
  sign: Signs;
  answers: number[];
  statistics: SolveCalculusStatistics;
}

export interface SolveCalculusStatistics {
  wrong: number;
  correct: number;
}

export enum Signs {
  ADD = '+',
  SUBTRACT = '-',
}

const MAX_VALUE = 4;

export enum Sounds {
  WRONG_ANSWER = require('@/assets/sounds/alien.mp3'),
  CORRECT_ANSWER = require('@/assets/sounds/click.mp3'),
}

type SolveCalculusActionContext = ActionContext<SolveCalculusStore, RootStore>;

export default {
  namespaced: true,
  state: {
    firstValue: 0,
    secondValue: 0,
    sign: Signs.ADD,
    answers: [],
    statistics: {
      wrong: 0,
      correct: 0,
    },
  },
  mutations: {
    setQuestion(
      state: SolveCalculusStore,
      {firstValue, secondValue, sign}: {firstValue: number; secondValue: number; sign: Signs}) {
      state.firstValue = firstValue;
      state.secondValue = secondValue;
      state.sign = sign;
    },
    setAnswers(state: SolveCalculusStore, value: number[]) {
      state.answers = value;
    },
    incWrong(state: SolveCalculusStore) {
      state.statistics.wrong++;
    },
    incCorrect(state: SolveCalculusStore) {
      state.statistics.correct++;
    },
  },
  actions: {
    initQuestion({state, commit, dispatch, getters}: SolveCalculusActionContext) {
      const firstValue: number = generateRandom(1, MAX_VALUE);
      const sign: Signs = Math.random() > 0.5 ? Signs.ADD : Signs.SUBTRACT;
      const answers: number[] = [];
      let secondValue: number;

      if (sign === Signs.SUBTRACT) {
        do {
          secondValue = generateRandom(1, MAX_VALUE);
        } while (secondValue > firstValue);
      } else {
        secondValue = generateRandom(1, MAX_VALUE);
      }


      if (sign === Signs.SUBTRACT) {
        answers.push(firstValue - secondValue);
      } else {
        answers.push(firstValue + secondValue);
      }

      answers.push(generateRandom(1, MAX_VALUE, answers));
      answers.push(generateRandom(1, MAX_VALUE, answers));
      answers.push(generateRandom(1, MAX_VALUE, answers));
      commit('setQuestion', { firstValue, secondValue, sign });
      commit('setAnswers', shuffle(answers));
    },

    processAnswer({state, commit, dispatch, getters}: SolveCalculusActionContext, userAnswer: number) {
      let isCorrect = false;

      if (state.sign === Signs.SUBTRACT) {
        isCorrect = (state.firstValue - state.secondValue) === userAnswer;
      } else {
        isCorrect = (state.firstValue + state.secondValue) === userAnswer;
      }

      if (isCorrect) {
        commit('incCorrect');
        dispatch('playSound', Sounds.CORRECT_ANSWER, {root: true});
      } else {
        commit('incWrong');
        dispatch('playSound', Sounds.WRONG_ANSWER, {root: true});
      }
      dispatch('initQuestion');
    },
  },
};

import Vue from 'vue';
import Vuex, {ActionContext} from 'vuex';
import { generateRandom, shuffle } from '@/utils/utils.ts';
import { RootStore, SHOWING_CORRECT_ANSWER_TIMEOUT, SHOWING_WRONG_ANSWER_TIMEOUT } from '@/stores/store.ts';

Vue.use(Vuex);

export interface SolveCalculusStore {
  isShowingAnswer: boolean;
  userAnswer: number;
  correctAnswer: number;
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
  SUBTRACT = '−',
}

const MAX_VALUE = 4;

export enum Sounds {
  WRONG_ANSWER = require('@/assets/sounds/alien.mp3'),
  CORRECT_ANSWER = require('@/assets/sounds/click.mp3'),
}

type SolveCalculusActionContext = ActionContext<SolveCalculusStore, RootStore>;

const SHOWING_ANSWER_TIMEOUT = 1500;

export default {
  namespaced: true,
  state: {
    isShowingAnswer: false,
    userAnswer: 0,
    correctAnswer: 0,
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
    setIsShowingAnswer(state: SolveCalculusStore, value: boolean) {
      state.isShowingAnswer = value;
    },
    setUserAnswer(state: SolveCalculusStore, value: number) {
      state.userAnswer = value;
    },
    setCorrectAnswer(state: SolveCalculusStore, value: number) {
      state.correctAnswer = value;
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
        commit('setCorrectAnswer', firstValue - secondValue);
      } else {
        answers.push(firstValue + secondValue);
        commit('setCorrectAnswer', firstValue + secondValue);
      }

      answers.push(generateRandom(1, MAX_VALUE, answers));
      answers.push(generateRandom(1, MAX_VALUE, answers));
      answers.push(generateRandom(1, MAX_VALUE, answers));
      commit('setQuestion', { firstValue, secondValue, sign });
      commit('setAnswers', shuffle(answers));
    },

    processAnswer({state, commit, dispatch, getters}: SolveCalculusActionContext, userAnswer: number) {
      commit('setUserAnswer', userAnswer);
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
      commit('setIsShowingAnswer', true);
      setTimeout(() => {
        commit('setIsShowingAnswer', false);
        dispatch('initQuestion');
      }, isCorrect ? SHOWING_CORRECT_ANSWER_TIMEOUT : SHOWING_WRONG_ANSWER_TIMEOUT);
    },
  },
};

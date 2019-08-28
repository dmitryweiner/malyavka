import Vue from 'vue';
import Vuex, {ActionContext} from 'vuex';
import { generateRandom, shuffle } from '@/utils/utils.ts';
import { RootStore, SHOWING_CORRECT_ANSWER_TIMEOUT, SHOWING_WRONG_ANSWER_TIMEOUT } from '@/stores/store';

Vue.use(Vuex);

export interface CountItemsStore {
  isShowingAnswer: boolean;
  displayedSymbols: string[];
  userAnswer: number;
  question: number;
  answers: number[];
  statistics: CountItemsStatistics;
}

export interface CountItemsStatistics {
  wrong: number;
  correct: number;
}

export enum Sounds {
  WRONG_ANSWER = require('@/assets/sounds/alien.mp3'),
  CORRECT_ANSWER = require('@/assets/sounds/click.mp3'),
}

type CountItemsActionContext = ActionContext<CountItemsStore, RootStore>;

const MAX_ITEMS = 8;

const getRandomSymbols = (n: number = 1): string[] => {
  let result = [];
  const emoji = [
    '\u{1F388}',
    '\u{1F382}',
    '\u{1F352}',
    '\u{1F347}',
    '\u{1F33B}',
    '\u{1F338}',
    '\u{1F30F}',
    '\u{1F302}',
    '\u{2B50}',
    '\u{26BD}',
    '\u{2600}',
    '\u{1F697}',
    '\u{1F680}',
    '\u{1F638}',
    '\u{1F603}',
  ];

  for (let i = 0; i < n; i++) {
    const index = Math.floor((Math.sin(Math.random() * emoji.length) + 1) / 2 * emoji.length);
    result.push(emoji[index]);
  }
  return result;
};

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
    displayedSymbols: '',
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
    setIsShowingAnswer(state: CountItemsStore, value: boolean) {
      state.isShowingAnswer = value;
    },
    setUserAnswer(state: CountItemsStore, value: number) {
      state.userAnswer = value;
    },
    setDisplayedSymbols(state: CountItemsStore, value: string[]) {
      state.displayedSymbols = value;
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
      commit('setDisplayedSymbols', getRandomSymbols(question));
    },

    processAnswer({state, commit, dispatch, getters}: CountItemsActionContext, userAnswer: number) {
      let isCorrect = false;

      commit('setUserAnswer', userAnswer);
      if (userAnswer === state.question) {
        commit('incCorrect');
        dispatch('playSound', Sounds.CORRECT_ANSWER, {root: true});
        isCorrect = true;
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

import Vue from 'vue';
import Vuex, {ActionContext} from 'vuex';
import { generateRandomLetter, shuffle } from '@/utils/utils.ts';
import wordsAndPictures from '@/data/words-and-pictures.ts';
import {RootStore} from '@/stores/store';

Vue.use(Vuex);

export interface GuessFirstLetterStore {
  question: WordAndPicture;
  answers: string[];
  statistics: GuessFirstLetterStatistics;
}

export interface WordAndPicture {
  word: string;
  picture: string;
}

export interface GuessFirstLetterStatistics {
  wrong: number;
  correct: number;
}

export enum Sounds {
  WRONG_ANSWER = require('@/assets/sounds/alien.mp3'),
  CORRECT_ANSWER = require('@/assets/sounds/click.mp3'),
}

type GuessFirstLetterActionContext = ActionContext<GuessFirstLetterStore, RootStore>;

export default {
  namespaced: true,
  state: {
    question: {
      word: '',
      picture: '',
    },
    answers: [],
    statistics: {
      wrong: 0,
      correct: 0,
    },
  },
  mutations: {
    setQuestion(
      state: GuessFirstLetterStore,
      question: WordAndPicture) {
      state.question = question;
    },
    setAnswers(state: GuessFirstLetterStore, value: string[]) {
      state.answers = value;
    },
    incWrong(state: GuessFirstLetterStore) {
      state.statistics.wrong++;
    },
    incCorrect(state: GuessFirstLetterStore) {
      state.statistics.correct++;
    },
  },
  actions: {
    initQuestion({state, commit, dispatch, getters}: GuessFirstLetterActionContext) {
      const index = Math.ceil(Math.random() * wordsAndPictures.length);
      const question: WordAndPicture = wordsAndPictures[index];
      const answers: string[] = [
        question.word[0],
      ];

      answers.push(generateRandomLetter(answers));
      answers.push(generateRandomLetter(answers));
      answers.push(generateRandomLetter(answers));
      commit('setQuestion', question);
      commit('setAnswers', shuffle(answers));
    },

    processAnswer({state, commit, dispatch, getters}: GuessFirstLetterActionContext, userAnswer: string) {
      let isCorrect = false;

      if (state.question.word[0] === userAnswer) {
        isCorrect = true;
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

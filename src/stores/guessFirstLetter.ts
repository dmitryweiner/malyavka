import Vue from 'vue';
import Vuex, {ActionContext} from 'vuex';
import { generateRandomLetter, shuffle } from '@/utils/utils.ts';
import wordsAndPictures from '@/data/words-and-pictures.ts';
import {RootStore} from '@/stores/store';

Vue.use(Vuex);

export interface GuessFirstLetterStore {
  isShowingAnswer: boolean;
  question: WordAndPicture;
  userAnswer: string;
  correctAnswer: string;
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

const SHOWING_ANSWER_TIMEOUT = 1500;

export default {
  namespaced: true,
  state: {
    isShowingAnswer: false,
    question: {
      word: '',
      picture: '',
    },
    answers: [],
    userAnswer: '',
    correctAnswer: '',
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
    setIsShowingAnswer(state: GuessFirstLetterStore, value: boolean) {
      state.isShowingAnswer = value;
    },
    setUserAnswer(state: GuessFirstLetterStore, value: string) {
      state.userAnswer = value;
    },
    setCorrectAnswer(state: GuessFirstLetterStore, value: string) {
      state.correctAnswer = value;
    },
  },
  actions: {
    initQuestion({state, commit, dispatch, getters}: GuessFirstLetterActionContext) {
      const index = Math.floor(Math.random() * wordsAndPictures.length);
      const question: WordAndPicture = wordsAndPictures[index];
      const answers: string[] = [
        question.word[0],
      ];

      answers.push(generateRandomLetter(answers));
      answers.push(generateRandomLetter(answers));
      answers.push(generateRandomLetter(answers));
      commit('setQuestion', question);
      commit('setCorrectAnswer', question.word[0]);
      commit('setAnswers', shuffle(answers));
    },

    processAnswer({state, commit, dispatch, getters}: GuessFirstLetterActionContext, userAnswer: string) {
      commit('setUserAnswer', userAnswer);
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
      commit('setIsShowingAnswer', true);
      setTimeout(() => {
        commit('setIsShowingAnswer', false);
        dispatch('initQuestion');
      }, SHOWING_ANSWER_TIMEOUT);

    },
  },
};

import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';
import { shuffle } from '@/utils/utils.ts';
import wordsAndPictures from '@/data/words-and-pictures.ts';
import { RootStore } from '@/stores/store';
import { WordAndPicture } from '@/interfaces/words-and-picture-interface';

Vue.use(Vuex);

export interface TranslateFromEnglishStore {
  isShowingAnswer: boolean;
  question: WordAndPicture;
  userAnswer: string;
  correctAnswer: string;
  answers: string[];
  statistics: TranslateFromEnglishStatistics;
}

export interface TranslateFromEnglishStatistics {
  wrong: number;
  correct: number;
}

export enum Sounds {
  WRONG_ANSWER = require('@/assets/sounds/alien.mp3'),
  CORRECT_ANSWER = require('@/assets/sounds/click.mp3'),
}

type TranslateFromEnglishActionContext = ActionContext<TranslateFromEnglishStore, RootStore>;

const SHOWING_ANSWER_TIMEOUT = 1500;

export default {
  namespaced: true,
  state: {
    isShowingAnswer: false,
    question: {
      word: {
        en: '',
        ru: '',
      },
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
      state: TranslateFromEnglishStore,
      question: WordAndPicture) {
      state.question = question;
    },
    setAnswers(state: TranslateFromEnglishStore, value: string[]) {
      state.answers = value;
    },
    incWrong(state: TranslateFromEnglishStore) {
      state.statistics.wrong++;
    },
    incCorrect(state: TranslateFromEnglishStore) {
      state.statistics.correct++;
    },
    setIsShowingAnswer(state: TranslateFromEnglishStore, value: boolean) {
      state.isShowingAnswer = value;
    },
    setUserAnswer(state: TranslateFromEnglishStore, value: string) {
      state.userAnswer = value;
    },
    setCorrectAnswer(state: TranslateFromEnglishStore, value: string) {
      state.correctAnswer = value;
    },
  },
  actions: {
    initQuestion({state, commit, dispatch, getters}: TranslateFromEnglishActionContext) {
      const index = Math.floor(Math.random() * wordsAndPictures.length);
      const question: WordAndPicture = wordsAndPictures[index];
      const answers: string[] = [
        question.word.ru,
      ];

      for (let i = 0; i < 3; i++) {
        let answer;
        do {
          answer =  wordsAndPictures[Math.floor(Math.random() * wordsAndPictures.length)].word.ru;
        } while (answers.includes(answer));
        answers.push(answer);
      }

      commit('setQuestion', question);
      commit('setCorrectAnswer', question.word.ru);
      commit('setAnswers', shuffle(answers));
    },

    processAnswer({state, commit, dispatch, getters}: TranslateFromEnglishActionContext, userAnswer: string) {
      commit('setUserAnswer', userAnswer);
      let isCorrect = false;

      if (state.correctAnswer === userAnswer) {
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

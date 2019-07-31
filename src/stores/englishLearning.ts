import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';
import { shuffle } from '@/utils/utils.ts';
import wordsAndPictures from '@/data/words-and-pictures.ts';
import { RootStore } from '@/stores/store';
import { WordAndPicture } from '@/interfaces/words-and-picture-interface';

Vue.use(Vuex);

export interface EnglishLearningStore {
  isShowingAnswer: boolean;
  question: WordAndPicture;
  userAnswer: string;
  correctAnswer: string;
  answers: string[];
  statistics: EnglishLearningStatistics;
}

export interface EnglishLearningStatistics {
  wrong: number;
  correct: number;
}

export enum Sounds {
  WRONG_ANSWER = require('@/assets/sounds/alien.mp3'),
  CORRECT_ANSWER = require('@/assets/sounds/click.mp3'),
}

type EnglishLearningActionContext = ActionContext<EnglishLearningStore, RootStore>;

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
      state: EnglishLearningStore,
      question: WordAndPicture) {
      state.question = question;
    },
    setAnswers(state: EnglishLearningStore, value: string[]) {
      state.answers = value;
    },
    incWrong(state: EnglishLearningStore) {
      state.statistics.wrong++;
    },
    incCorrect(state: EnglishLearningStore) {
      state.statistics.correct++;
    },
    setIsShowingAnswer(state: EnglishLearningStore, value: boolean) {
      state.isShowingAnswer = value;
    },
    setUserAnswer(state: EnglishLearningStore, value: string) {
      state.userAnswer = value;
    },
    setCorrectAnswer(state: EnglishLearningStore, value: string) {
      state.correctAnswer = value;
    },
  },
  actions: {
    initQuestion({state, commit, dispatch, getters}: EnglishLearningActionContext) {
      const index = Math.floor(Math.random() * wordsAndPictures.length);
      const question: WordAndPicture = wordsAndPictures[index];
      const answers: string[] = [
        question.word.en,
      ];

      for (let i = 0; i < 3; i++) {
        let answer;
        do {
          answer =  wordsAndPictures[Math.floor(Math.random() * wordsAndPictures.length)].word.en;
        } while (answers.includes(answer));
        answers.push(answer);
      }

      commit('setQuestion', question);
      commit('setCorrectAnswer', question.word.en);
      commit('setAnswers', shuffle(answers));
    },

    processAnswer({state, commit, dispatch, getters}: EnglishLearningActionContext, userAnswer: string) {
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

    getPictures({state, commit, dispatch, getters}: EnglishLearningActionContext) {
      return wordsAndPictures;
    },
  },
};

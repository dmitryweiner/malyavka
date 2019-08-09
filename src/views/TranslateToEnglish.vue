<template>
  <div class="translate-to-english">
    <h3>Переведи на английский</h3>
    <div class="wrapper">
      <div class="row">
        <PictureAndWord
          :question="$store.state.translateToEnglish.question.word.ru"
          :picture="$store.state.translateToEnglish.question.picture"
          :isShowingAnswer="$store.state.translateToEnglish.isShowingAnswer"
        />
      </div>
      <div class="row">
        <AnswersTwoRows
          :answers="$store.state.translateToEnglish.answers"
          :isShowingAnswer="$store.state.translateToEnglish.isShowingAnswer"
          :userAnswer="$store.state.translateToEnglish.userAnswer"
          :correctAnswer="$store.state.translateToEnglish.correctAnswer"
          @onClick="onClick"/>
      </div>
      <div class="row">
        <Statistics
          :correct="$store.state.translateToEnglish.statistics.correct"
          :wrong="$store.state.translateToEnglish.statistics.wrong" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PictureAndWord from '@/components/TranslateToEnglish/PictureAndWord.vue';
import AnswersTwoRows from '@/components/common/AnswersTwoRows.vue';
import Statistics from '@/components/common/Statistics.vue';

@Component({
  components: {
    PictureAndWord,
    AnswersTwoRows,
    Statistics,
  },
})
export default class TranslateToEnglish extends Vue {

  public mounted() {
    this.$store.dispatch('translateToEnglish/initQuestion');
  }

  public onClick(value: number) {
    if (!this.$store.state.translateToEnglish.isShowingAnswer) {
      this.$store.dispatch('translateToEnglish/processAnswer', value);
    }
  }

}
</script>

<style scoped>
  .translate-to-english {
    height: calc(100% - 90px);
  }

  .translate-to-english .wrapper {
    height: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  .translate-to-english .wrapper .row {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
</style>

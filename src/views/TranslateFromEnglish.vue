<template>
  <div class="translate-to-english">
    <h3>Переведи c английского</h3>
    <div class="wrapper">
      <div class="row">
        <PictureAndWord
          :question="$store.state.translateFromEnglish.question.word.en"
          :picture="$store.state.translateFromEnglish.question.picture"
          :isShowingAnswer="$store.state.translateFromEnglish.isShowingAnswer"
        />
      </div>
      <div class="row">
        <AnswersTwoRows
          :answers="$store.state.translateFromEnglish.answers"
          :isShowingAnswer="$store.state.translateFromEnglish.isShowingAnswer"
          :userAnswer="$store.state.translateFromEnglish.userAnswer"
          :correctAnswer="$store.state.translateFromEnglish.correctAnswer"
          @onClick="onClick"/>
      </div>
      <div class="row">
        <Statistics
          :correct="$store.state.translateFromEnglish.statistics.correct"
          :wrong="$store.state.translateFromEnglish.statistics.wrong" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PictureAndWord from '@/components/common/PictureAndWord.vue';
import AnswersTwoRows from '@/components/common/AnswersTwoRows.vue';
import Statistics from '@/components/common/Statistics.vue';

@Component({
  components: {
    PictureAndWord,
    AnswersTwoRows,
    Statistics,
  },
})
export default class TranslateFromEnglish extends Vue {

  public mounted() {
    this.$store.dispatch('translateFromEnglish/initQuestion');
  }

  public onClick(value: number) {
    if (!this.$store.state.translateFromEnglish.isShowingAnswer) {
      this.$store.dispatch('translateFromEnglish/processAnswer', value);
    }
  }

}
</script>

<style scoped>
  .translate-to-english {
    height: calc(100% - 90px);
  }

  translate-to-english .wrapper {
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

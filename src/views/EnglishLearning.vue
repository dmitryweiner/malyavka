<template>
  <div class="english-learning">
    <h3>Учим английский</h3>
    <div class="wrapper">
      <div class="row">
        <PictureAndWord
          :question="$store.state.englishLearning.question"
          :isShowingAnswer="$store.state.englishLearning.isShowingAnswer"
        />
      </div>
      <div class="row">
        <Answers
          :answers="$store.state.englishLearning.answers"
          :isShowingAnswer="$store.state.englishLearning.isShowingAnswer"
          :userAnswer="$store.state.englishLearning.userAnswer"
          :correctAnswer="$store.state.englishLearning.correctAnswer"
          @onClick="onClick"/>
      </div>
      <div class="row">
        <Statistics
          :correct="$store.state.englishLearning.statistics.correct"
          :wrong="$store.state.englishLearning.statistics.wrong" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PictureAndWord from '@/components/EnglishLearning/PictureAndWord.vue';
import Answers from '@/components/EnglishLearning/Answers.vue';
import Statistics from '@/components/common/Statistics.vue';

@Component({
  components: {
    PictureAndWord,
    Answers,
    Statistics,
  },
})
export default class EnglishLearning extends Vue {

  public mounted() {
    this.$store.dispatch('englishLearning/initQuestion');
  }

  public onClick(value: number) {
    if (!this.$store.state.englishLearning.isShowingAnswer) {
      this.$store.dispatch('englishLearning/processAnswer', value);
    }
  }

}
</script>

<style scoped>
  .english-learning {
    height: calc(100% - 90px);
  }

  english-learning .wrapper {
    height: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  .english-learning .wrapper .row {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
</style>

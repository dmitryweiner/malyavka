<template>
  <div class="guess-first-letter">
    <h3>Угадай первую букву</h3>
    <div class="wrapper">
      <div class="row">
        <Picture
          :question="$store.state.guessFirstLetter.question"
          :isShowingAnswer="$store.state.guessFirstLetter.isShowingAnswer"
        />
      </div>
      <div class="row">
        <Answers
          :answers="$store.state.guessFirstLetter.answers"
          :isShowingAnswer="$store.state.guessFirstLetter.isShowingAnswer"
          :userAnswer="$store.state.guessFirstLetter.userAnswer"
          :correctAnswer="$store.state.guessFirstLetter.correctAnswer"
          @onClick="onClick"/>
      </div>
      <div class="row">
        <Statistics
          :correct="$store.state.guessFirstLetter.statistics.correct"
          :wrong="$store.state.guessFirstLetter.statistics.wrong" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Picture from '@/components/GuessFirstLetter/Picture.vue';
import Answers from '@/components/common/Answers.vue';
import Statistics from '@/components/common/Statistics.vue';

@Component({
  components: {
    Picture,
    Answers,
    Statistics,
  },
})
export default class GuessFirstLetter extends Vue {

  public mounted() {
    this.$store.dispatch('guessFirstLetter/initQuestion');
  }

  public onClick(value: number) {
    if (!this.$store.state.guessFirstLetter.isShowingAnswer) {
      this.$store.dispatch('guessFirstLetter/processAnswer', value);
    }
  }

}
</script>

<style scoped>
  .guess-first-letter {
    height: calc(100% - 90px);
  }

  .guess-first-letter .wrapper {
    height: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  .guess-first-letter .wrapper .row {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
</style>

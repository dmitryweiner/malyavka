<template>
  <div class="solve-calculus">
    <h3>Угадай первую букву</h3>
    <div class="wrapper">
      <div class="row">
        <Picture
          :question="$store.state.guessFirstLetter.question"
        />
      </div>
      <div class="row">
        <Answers :answers="$store.state.guessFirstLetter.answers" @onClick="onClick"/>
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
    this.$store.dispatch('guessFirstLetter/processAnswer', value);
  }

}
</script>

<style scoped>
  .solve-calculus {
    height: calc(100% - 90px);
  }

  .solve-calculus .wrapper {
    height: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  .solve-calculus .wrapper .row {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
</style>

<template>
  <div class="solve-calculus">
    <h3>Реши пример</h3>
    <div class="wrapper">
      <div class="row">
        <Values
          :firstValue="$store.state.solveCalculus.firstValue"
          :secondValue="$store.state.solveCalculus.secondValue"
          :sign="$store.state.solveCalculus.sign"
          :isShowingAnswer="$store.state.solveCalculus.isShowingAnswer"
          :correctAnswer="$store.state.solveCalculus.correctAnswer"
        />
      </div>
      <div class="row">
        <Answers
          :answers="$store.state.solveCalculus.answers"
          :isShowingAnswer="$store.state.solveCalculus.isShowingAnswer"
          :userAnswer="$store.state.solveCalculus.userAnswer"
          :correctAnswer="$store.state.solveCalculus.correctAnswer"
          @onClick="onClick"/>
      </div>
      <div class="row">
        <Statistics
          :correct="$store.state.solveCalculus.statistics.correct"
          :wrong="$store.state.solveCalculus.statistics.wrong" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Values from '@/components/SolveCalculus/Values.vue';
import Answers from '@/components/common/Answers.vue';
import Statistics from '@/components/common/Statistics.vue';

@Component({
  components: {
    Values,
    Answers,
    Statistics,
  },
})
export default class CountItems extends Vue {

  public mounted() {
    this.$store.dispatch('solveCalculus/initQuestion');
  }

  public onClick(value: number) {
    this.$store.dispatch('solveCalculus/processAnswer', value);
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

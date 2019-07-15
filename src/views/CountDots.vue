<template>
  <div class="count-dots">
    <h3>Посчитай вещи!</h3>
    <div class="wrapper">
      <div class="row">
        <Dots :dotsCount="$store.state.countDots.question" />
      </div>
      <div class="row">
        <Answers :answers="$store.state.countDots.answers" @onClick="onClick"/>
      </div>
      <div class="row">
        <Statistics
          :correct="$store.state.countDots.statistics.correct"
          :wrong="$store.state.countDots.statistics.wrong" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Dots from '@/components/CountDots/Dots.vue';
import Answers from '@/components/CountDots/Answers.vue';
import Statistics from '@/components/CountDots/Statistics.vue';

@Component({
  components: {
    Dots,
    Answers,
    Statistics,
  },
})
export default class CountDots extends Vue {

  public mounted() {
    this.$store.dispatch('initQuestion');
  }

  public onClick(value: number) {
    this.$store.dispatch('processAnswer', value);
  }

}
</script>

<style scoped>
  .count-dots {
    height: calc(100% - 90px);
  }

  .wrapper {
    height: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  .wrapper .row {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
</style>

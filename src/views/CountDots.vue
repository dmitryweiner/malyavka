<template>
  <div class="main-screen">
    <h3>Посчитай вещи!</h3>
    <Dots :dotsCount="$store.state.countDots.question" />
    <Answers :answers="$store.state.countDots.answers" @onClick="onClick"/>
    <Statistics
      :correct="$store.state.countDots.statistics.correct"
      :wrong="$store.state.countDots.statistics.wrong" />
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
</style>

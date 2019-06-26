<template>
  <div class="main-screen">
    <h3>Подсчёт точек</h3>
    <Dots :dotsCount="$store.state.countDots.question" />
    <Answers :answers="$store.state.countDots.answers" @onClick="onClick"/>
    <div>
      Правильных ответов: {{$store.state.countDots.statistics.correct}} <br/>
      Неверных ответов: {{$store.state.countDots.statistics.wrong}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Dots from '@/components/CountDots/Dots.vue';
import Answers from '@/components/CountDots/Answers.vue';

@Component({
  components: {
    Dots,
    Answers,
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

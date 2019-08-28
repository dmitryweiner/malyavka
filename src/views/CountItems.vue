<template>
  <div class="count-dots">
    <h3>Посчитай картинки!</h3>
    <div class="wrapper">
      <div class="row">
        <Items
          :isShowingAnswer="$store.state.countItems.isShowingAnswer"
          :itemsCount="$store.state.countItems.question"
          :displayedSymbols="$store.state.countItems.displayedSymbols"/>
      </div>
      <div class="row">
        <Answers
          :answers="$store.state.countItems.answers"
          :isShowingAnswer="$store.state.countItems.isShowingAnswer"
          :userAnswer="$store.state.countItems.userAnswer"
          :correctAnswer="$store.state.countItems.question"
          @onClick="onClick"/>
      </div>
      <div class="row">
        <Statistics
          :correct="$store.state.countItems.statistics.correct"
          :wrong="$store.state.countItems.statistics.wrong" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Items from '@/components/CountItems/Items.vue';
import Answers from '@/components/common/Answers.vue';
import Statistics from '@/components/common/Statistics.vue';

@Component({
  components: {
    Items,
    Answers,
    Statistics,
  },
})
export default class CountItems extends Vue {

  public mounted() {
    this.$store.dispatch('countItems/initQuestion');
  }

  public onClick(value: number) {
    this.$store.dispatch('countItems/processAnswer', value);
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

<template>
  <div class="statistics">
    <div class="correct">
      <template v-for="i in correct">{{'\u{1F36C}'}}</template>
    </div>
    <div class="wrong">
      <template v-for="i in wrong">{{'\u{1F41B}'}}</template>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class CountDots extends Vue {
    @Prop() public correct!: number;
    @Prop() public wrong!: number;
  }
</script>

<style scoped>
  .statistics {
    width: 100%;
    margin-top: 40px;
    font-size: 40px;
  }

  .statistics .correct, .statistics .wrong {
    width: 50%;
    margin: 0 auto;
  }
</style>

<template>
  <div class="answers">
    <template v-for="answer in answers">
      <div>{{answer}}</div>
    </template>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class Answers extends Vue {
    @Prop() public answers!: number;
  }
</script>

<style scoped>
</style>

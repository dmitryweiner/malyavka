<template>
  <div class="dots">
    <template v-for="i in dotsCount">.</template>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class CountDots extends Vue {
    @Prop() public dotsCount!: number;
  }
</script>

<style scoped>
  .dots {
    font-size: 60px;
  }
</style>

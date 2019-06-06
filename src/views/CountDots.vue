<template>
  <div class="main-screen">
    <h3>Подсчёт точек</h3>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CountDots extends Vue {
  @Prop() private msg!: string;
}
</script>

<style scoped>
</style>

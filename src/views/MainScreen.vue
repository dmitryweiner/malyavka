<template>
  <div class="main-screen">
    <h1>Сборник игр для обучения мелких особей</h1>
    <h3>Статистика</h3>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MainScreen extends Vue {
  @Prop() private msg!: string;
}
</script>

<style scoped>
</style>

<template>
  <div class="main-screen">
    <h1>Сборник игр для обучения мелких особей</h1>
    <h3><router-link to="/countItems">Посчитай картинки</router-link></h3>
    <h3><router-link to="/solveCalculus">Реши пример</router-link></h3>
    <h3><router-link to="/guessFirstLetter">Угадай букву</router-link></h3>
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

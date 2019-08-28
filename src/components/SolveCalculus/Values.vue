<template>
  <div class="values">
    <span>{{firstValue}}</span>
    <span :class="{'sign add': isSignAdd, 'sign subtract': !isSignAdd}">{{sign}}</span>
    <span>{{secondValue}}</span>
    <span>=</span>
    <span v-if="isShowingAnswer">{{correctAnswer}}</span>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Signs } from '@/stores/solveCalculus.ts';

  @Component
  export default class Values extends Vue {
    @Prop() public firstValue!: number;
    @Prop() public secondValue!: number;
    @Prop() public sign!: Signs;
    @Prop() public isShowingAnswer!: boolean;
    @Prop() public correctAnswer!: number;

    get isSignAdd(): boolean {
      // Here we can't write Signs.ADD due to "TypeError: rawModule is undefined" error
      // @see https://github.com/vuejs/vue-loader/issues/1281
      return this.sign === '+';
    }

  }
</script>

<style scoped>
  .values {
    margin-top: 20px;
    font-size: 60px;
    margin-left: 10px;
    margin-right: 10px;
  }

  @media only screen and (max-width: 768px) {
    .values {
      margin-top: 10px;
      font-size: 30px;
    }
  }

  .values span {
    margin: 10px;
  }

  .sign.add {
    color: darkgreen;
  }

  .sign.subtract {
    color: darkred;
  }
</style>

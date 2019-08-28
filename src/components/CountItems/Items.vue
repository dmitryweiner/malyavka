<template>
  <div class="items">
    <template v-for="i in itemsCount"><span>{{ displayedSymbols[i - 1] }}</span></template>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class Items extends Vue {
    @Prop() public itemsCount!: number;
    @Prop() public isShowingAnswer!: boolean;
    @Prop() public displayedSymbols!: string;
  }
</script>

<style scoped>
  .items {
    margin-top: 20px;
    font-size: 60px;
    margin-left: 10px;
    margin-right: 10px;
    font-family: 'emoji';
  }

  @media only screen and (max-width: 768px) {
    .items {
      margin-top: 10px;
      font-size: 40px;
    }
  }


  .items span {
    margin: 10px;
  }
</style>

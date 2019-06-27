<template>
  <div class="dots">
    <template v-for="i in dotsCount"><span>{{getRandomSymbol()}}</span></template>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class CountDots extends Vue {
    @Prop() public dotsCount!: number;

    public getRandomSymbol(): string {
      const emoji = [
        '\u{1F388}',
        '\u{1F382}',
        '\u{1F352}',
        '\u{1F347}',
        '\u{1F33B}',
        '\u{1F338}',
        '\u{1F30F}',
        '\u{1F302}',
        '\u{2B50}',
        '\u{26BD}',
        '\u{2600}',
        '\u{1F697}',
        '\u{1F680}',
        '\u{1F638}',
        '\u{1F603}',
      ];

      return emoji[Math.round(Math.random() * (emoji.length - 1))];
    }
  }
</script>

<style scoped>
  .dots {
    margin-top: 20px;
    font-size: 60px;
  }

  .dots span {
    margin: 10px;
  }
</style>

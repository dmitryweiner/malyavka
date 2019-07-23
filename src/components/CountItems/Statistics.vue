<template>
  <div class="statistics">
    <div>
      {{correct}}{{'\u{1F36C}'}}
      &nbsp;&nbsp;
      {{wrong}}{{'\u{1F41B}'}}
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

  @media only screen and (max-width: 768px) {
    .statistics {
      margin-top: 0;
      font-size: 20px;
    }
  }

</style>

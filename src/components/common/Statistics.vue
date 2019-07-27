<template>
  <div class="statistics">
    <div>
      {{correct}}<span class="emoji">{{'\u{1F36C}'}}</span>
      &nbsp;&nbsp;
      {{wrong}}<span class="emoji">{{'\u{1F41B}'}}</span>
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

  .statistics .emoji {
    font-family: 'emoji';
  }

  @media only screen and (max-width: 768px) {
    .statistics {
      margin-top: 0;
      font-size: 20px;
    }
  }

</style>

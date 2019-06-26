<template>
  <div class="answers">
    <template v-for="answer in answers">
      <input type="button" :value="answer" @click="onClick(answer)" />
    </template>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class Answers extends Vue {
    @Prop() public answers!: number;

    public onClick(value: number) {
      this.$emit('onClick', value);
    }

  }
</script>

<style scoped>
</style>

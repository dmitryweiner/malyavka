<template>
  <div class="answers">
    <div>
      <template v-for="answer in firstRowAnswers">
        <input
          type="button"
          :value="answer"
          :disabled="isShowingAnswer"
          :class="{'correct': isCorrect(answer), 'wrong': isWrong(answer)}"
          @click="onClick(answer)" />
      </template>
    </div>
    <div>
      <template v-for="answer in secondRowAnswers">
        <input
          type="button"
          :value="answer"
          :disabled="isShowingAnswer"
          :class="{'correct': isCorrect(answer), 'wrong': isWrong(answer)}"
          @click="onClick(answer)" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class Answers extends Vue {
    @Prop() public answers!: string[];
    @Prop() public isShowingAnswer?: boolean;
    @Prop() public userAnswer?: string;
    @Prop() public correctAnswer?: string;

    get firstRowAnswers(): string[] {
      return [ this.answers[0], this.answers[1] ];
    }

    get secondRowAnswers(): string[] {
      return [ this.answers[2], this.answers[3] ];
    }

    private onClick(value: number) {
      this.$emit('onClick', value);
    }

    private isCorrect(answer: string): boolean {
      if (!this.isShowingAnswer) {
        return false;
      }

      if (this.correctAnswer === answer) {
        return true;
      }
      return false;
    }

    private isWrong(answer: string): boolean {
      if (!this.isShowingAnswer) {
        return false;
      }

      if (this.userAnswer === answer && this.userAnswer !== this.correctAnswer) {
        return true;
      }
      return false;
    }


  }
</script>

<style scoped>
  .answers {
    margin-top: 40px;
  }

  .answers input {
    margin: 10px;
    font-size: 40px;
  }

  @media only screen and (max-width: 768px) {
    .answers input {
      font-size: 20px;
    }
  }

  .correct {
    color: green;
  }

  .wrong {
    color: red;
  }

</style>

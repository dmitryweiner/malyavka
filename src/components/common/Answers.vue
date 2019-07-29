<template>
  <div class="answers">
    <template v-for="answer in answers">
      <input
        type="button"
        :value="getAnswerCaption(answer)"
        :disabled="isShowingAnswer"
        :class="{'correct': isCorrect(answer), 'wrong': isWrong(answer)}"
        @click="onClick(answer)" />
    </template>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class Answers extends Vue {
    @Prop() public answers!: number;
    @Prop() public isShowingAnswer?: boolean;
    @Prop() public userAnswer?: string;
    @Prop() public correctAnswer?: string;

    private onClick(value: number) {
      this.$emit('onClick', value);
    }

    private getAnswerCaption(answer: any): string {
      if (typeof answer === 'string') {
        return answer.toUpperCase();
      }
      return answer;
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
    font-size: 60px;
  }

  @media only screen and (max-width: 768px) {
    .answers input {
      font-size: 30px;
    }
  }

  .correct {
    color: green;
  }

  .wrong {
    color: red;
  }

</style>

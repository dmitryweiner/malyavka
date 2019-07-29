<template>
  <div class="picture">
    <img src="@/assets/loader2.gif" v-show="isLoading"/>
    <img :src="iconUrl" v-on:load="onLoaded" v-show="!isLoading"/>
    <div class="answer" v-if="isShowingAnswer">
      <span>{{this.question.word}}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { WordAndPicture } from 'src/stores/guessFirstLetter';

  @Component
  export default class Picture extends Vue {
    @Prop() public question!: WordAndPicture;
    @Prop() public isShowingAnswer!: boolean;
    private isLoading: boolean = false;
    private timeoutId?: number;

    get iconUrl() {
      if (this.question.picture) {
        return require(`@/assets/pictures/${this.question.picture}`);
      }
    }

    @Watch('iconUrl')
    private onIconUrlChanged() {
      this.timeoutId = setTimeout(() => this.isLoading = true, 250);
    }

    private onLoaded() {
      this.isLoading = false;
      clearTimeout(this.timeoutId);
    }
  }
</script>

<style scoped>
  .picture {
    margin-top: 20px;
    font-size: 60px;
    margin-left: 10px;
    margin-right: 10px;
    position: relative;
  }

  @media only screen and (max-width: 768px) {
    .picture {
      margin-top: 10px;
      font-size: 30px;
    }
  }

  .picture img {
    max-height: 200px;
    min-height: 200px;
  }

  .answer {
    width: 100%;
    bottom: 15px;
    position: absolute;
  }

  .answer span {
    font-size: 40px;
    background-color: white;
    padding: 5px;
    border-radius: 5px;
  }

</style>

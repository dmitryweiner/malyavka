<template>
  <div class="picture"  @click="toggleIsShowed">
    <img src="@/assets/loader2.gif" v-show="isLoading"/>
    <img :src="iconUrl" v-on:load="onLoaded" v-show="!isLoading && isAnswerShowed"/>
    <div class="word" v-show="!isAnswerShowed">
      <span>{{this.question}}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

  @Component
  export default class PictureAndWordTogglable extends Vue {
    @Prop() public question!: string;
    @Prop() public picture!: string;
    @Prop() public isShowingAnswer!: boolean;
    private isLoading: boolean = false;
    private timeoutId?: number;
    private isAnswerShowed: boolean = false;

    get iconUrl() {
      if (this.picture) {
        return require(`@/assets/pictures/${this.picture}`);
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

    private toggleIsShowed() {
      this.isAnswerShowed = !this.isAnswerShowed;
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
    max-height: 200px;
    min-height: 200px;
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

  .word {
    width: 100%;
    bottom: 35px;
    position: absolute;
  }

  .word span {
    font-size: 60px;
    background-color: white;
    padding: 5px;
    border-radius: 5px;
  }

  @media only screen and (max-width: 768px) {
    .word span {
      font-size: 30px;
    }
  }

</style>

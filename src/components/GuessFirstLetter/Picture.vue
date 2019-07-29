<template>
  <div class="picture">
    <img src="@/assets/loader.gif" v-show="isLoading"/>
    <img :src="iconUrl" v-on:load="onLoaded" v-show="!isLoading"/>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { WordAndPicture } from 'src/stores/guessFirstLetter';

  @Component
  export default class Picture extends Vue {
    @Prop() public question!: WordAndPicture;
    private isLoading: boolean = false;

    get iconUrl() {
      if (this.question.picture) {
        return require(`@/assets/pictures/${this.question.picture}`);
      }
    }

    @Watch('iconUrl')
    private onIconUrlChanged() {
      this.isLoading = true;
    }

    private onLoaded() {
      this.isLoading = false;
    }
  }
</script>

<style scoped>
  .picture {
    margin-top: 20px;
    font-size: 60px;
    margin-left: 10px;
    margin-right: 10px;
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

</style>

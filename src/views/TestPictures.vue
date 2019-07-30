<template>
  <div>
    <h3>Тест картинок</h3>
    <div class="wrapper">
      <div v-for="picture in pictures"><img :src="iconUrl(picture)"/></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { WordAndPicture } from 'src/stores/guessFirstLetter';

@Component({})
export default class TestPictures extends Vue {
  private pictures: WordAndPicture[] = [];

  public mounted() {
    this.$store.dispatch('guessFirstLetter/getPictures').then((pictures) => this.pictures = pictures);
  }

  private iconUrl(picture: WordAndPicture): string {
    return require(`@/assets/pictures/${picture.picture}`);
  }

}
</script>

<style scoped>

  .wrapper {
    height: 400px;
    overflow-y: scroll;
  }
</style>

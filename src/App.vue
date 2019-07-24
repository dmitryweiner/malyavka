<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-nav>
        <b-nav-item to="/">Главная страница</b-nav-item>
        <b-nav-item to="/countDots">Посчитай вещи</b-nav-item>
        <b-nav-item to="/solveCalculus">Реши пример</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import 'bootstrap/dist/css/bootstrap.css';
  import 'bootstrap-vue/dist/bootstrap-vue.css';

  @Component({
    components: {},
  })
  export default class App extends Vue {
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }

  html,
  body {
    height: 100%;
    overflow-y: hidden;
  }
</style>

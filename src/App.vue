<template>
  <n-config-provider :theme="theme">
  <MainPage/>
  </n-config-provider>
</template>

<script setup>

import {darkTheme, NConfigProvider} from 'naive-ui';
import MainPage from "@/components/MainPage.vue";
const theme = darkTheme;
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

html, body {
  height: 100%;
  margin: 0;
}

body {
  background-image: url("./assets/img/space-bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>

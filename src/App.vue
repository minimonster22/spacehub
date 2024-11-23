<template>
  <n-config-provider :theme="theme">
    <router-view></router-view>
  </n-config-provider>
</template>

<script setup>

import {darkTheme, NConfigProvider} from 'naive-ui';
const theme = darkTheme;
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');
* {
  font-family: 'Mulish', sans-serif;
  font-optical-sizing: auto;
  color: #9B6AD6;
}
#app {

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #9B6AD6;

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

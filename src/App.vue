<template>
  <n-notification-provider>
    <n-config-provider :theme="theme">
      <router-view></router-view>
    </n-config-provider>
  </n-notification-provider>
</template>

<script setup>

import {darkTheme, NConfigProvider, NNotificationProvider} from 'naive-ui';

const theme = darkTheme;
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');

* {
  font-family: 'Mulish', sans-serif;
  font-optical-sizing: auto;
}

a {
  text-decoration: none;
  color: #6a11cb;
}

a:hover {
  text-decoration: underline;
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
  background-position: center;
}
</style>

<template>
  <n-config-provider :theme="darkTheme">
    <HeaderPage class="header"/>
    <NavigationBox/>
  </n-config-provider>
</template>

<script>
import { defineComponent } from 'vue';
import { darkTheme, NConfigProvider  } from 'naive-ui';
import HeaderPage from "@/components/HeaderPage.vue";
import NavigationBox from "@/components/NavigationBox.vue";

export default defineComponent({
  name: 'MainPage',
  components: {NavigationBox, HeaderPage, NConfigProvider},
  setup() {
    return {
      darkTheme
    };
  }
})
</script>

<style scoped>
.header {
  margin-top: 20px;
}
</style>

<template>
  <n-card class="header">
    <div class="header-container">
      <h1 class="header-title">Header</h1>
      <div class="header-slot">
        <slot></slot>
      </div>
    </div>
  </n-card>
</template>

<script setup>
</script>

<style scoped>
.header {
  padding: 16px;
}


.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.header-title {
  flex: 1;
  text-align: center;
  margin: 0;
}


.header-slot {
  flex-shrink: 0;
}
</style>

<template>
  <n-card class="header">
    <div class="header-container">
      <div class="back-btn" v-if="$slots['back-btn']">
        <slot name="back-btn"></slot>
      </div>
      <h1 class="header-title">
        <slot name="header-title">NASA SpaceHub</slot>
      </h1>
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
  margin-bottom: 20px;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back-btn {
  flex-shrink: 0;
}

.header-title {
  flex: 1;
  text-align: center;
  margin: 0;
  color: #6a11cb;
}

.header-slot {
  flex-shrink: 0;
}

@media (max-width: 740px) {
  .header-title {
    font-size: 1.5em;
  }
}

@media (max-width: 630px) {
  .header-title {
    font-size: 1.3em;
  }
}
</style>

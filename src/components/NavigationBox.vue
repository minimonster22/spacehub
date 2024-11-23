<template>
  <div class="container">
    <router-link to="/apod">
      <n-card title="Astronomy Picture of the Day" class="card-item">
        Картинка дня
      </n-card>
    </router-link>

    <router-link to="/asteroids">
      <n-card title="Asteroids" class="card-item">
        Информация об астероидах, что приближаются к Земле
      </n-card>
    </router-link>

    <router-link to="/notifications">
      <n-card title="Notifications" class="card-item">
        Астероиды в выбранный период времени
      </n-card>
    </router-link>

    <router-link to="/epic">
      <n-card title="EPIC" class="card-item">
        Картинка Земли из космоса
      </n-card>
    </router-link>

    <router-link to="/experiments">
      <n-card title="Experiments" class="card-item">
        Эксперименты
      </n-card>
    </router-link>

    <router-link to="/tech-transfer">
      <n-card title="Tech Transfer" class="card-item">
        Поиск по патентам
      </n-card>
    </router-link>
  </div>
</template>

<script setup>


</script>


<style scoped>

.container {
  margin: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-around;
}

.card-item {
  width: 12vw;
  cursor: pointer;
}

.card-item:hover {
  border: 1px solid blueviolet;
}
</style>
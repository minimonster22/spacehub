<template>
  <div class="container">
    <router-link to="/apod">
      <n-card v-if="showApod" title="Astronomy Picture of the Day" class="card-item">
        Картинка дня
      </n-card>
    </router-link>

    <router-link to="/asteroids">
      <n-card v-if="showAsteroids" title="Asteroids" class="card-item">
        Информация об астероидах, что приближаются к Земле
      </n-card>
    </router-link>

    <!-- Условное отображение карточки Notifications -->
    <router-link v-if="showNotifications" to="/notifications">
      <n-card title="Notifications" class="card-item">
        Астероиды в выбранный период времени
      </n-card>
    </router-link>

    <router-link to="/epic">
      <n-card v-if="showEpic" title="EPIC" class="card-item">
        Картинка Земли из космоса
      </n-card>
    </router-link>

    <router-link to="/experiments">
      <n-card v-if="showExperiments" title="Experiments" class="card-item">
        Эксперименты
      </n-card>
    </router-link>

    <router-link to="/tech-transfer">
      <n-card v-if="showTechTransfer" title="Tech Transfer" class="card-item">
        Поиск по патентам
      </n-card>
    </router-link>
  </div>
</template>

<script setup>
const showApod = true;
const showAsteroids = true;
const showNotifications = true;
const showEpic = false;
const showExperiments = false;
const showTechTransfer = false;
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
  width: 30vw;
  cursor: pointer;
}

.card-item:hover {
  border: 1px solid #6a11cb;
}
</style>
<template>
  <div class="container">
    <!-- Условное отображение всей ссылки -->
    <router-link v-if="showApod" to="/apod">
      <n-card title="Astronomy Picture of the Day" class="card-item">
       <div class="responsive-text">Картинка дня</div>
      </n-card>
    </router-link>

    <router-link v-if="showAsteroids" to="/asteroids">
      <n-card title="Asteroids" class="card-item">
      <div class="responsive-text">Информация об астероидах, что приближаются к Земле</div>
      </n-card>
    </router-link>

    <router-link v-if="showNotifications" to="/notifications">
      <n-card title="Notifications" class="card-item">
       <div class="responsive-text">Астероиды в выбранный период времени</div>
      </n-card>
    </router-link>

    <router-link v-if="showEpic" to="/epic">
      <n-card title="EPIC" class="card-item">
       <div class="responsive-text">Картинка Земли из космоса</div>
      </n-card>
    </router-link>

    <router-link v-if="showExperiments" to="/experiments">
      <n-card title="Experiments" class="card-item">
      <div class="responsive-text">Эксперименты</div>
      </n-card>
    </router-link>

    <router-link v-if="showTechTransfer" to="/tech-transfer">
      <n-card title="Tech Transfer" class="card-item">
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
  justify-content: center;
}

.card-item {
  width: 30vw;
  cursor: pointer;
}

.card-item:hover {
  border: 1px solid #6a11cb;
}

.responsive-text {
  font-size: 16px;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

@media (max-width: 600px) {
  .responsive-text {
    font-size: 14px;
  }
}
</style>
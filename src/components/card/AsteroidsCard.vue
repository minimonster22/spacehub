<template>
  <HeaderPage>
    <template #back-btn>
      <router-link to="/">
        <n-button ghost color="#8a2be2" class="btn">
          <template #icon>
            <n-icon>
              <Home28Regular/>
            </n-icon>
          </template>
        </n-button>
      </router-link>
    </template>
    <template #header-title>
      Информация об астероидах, что приближаются к Земле
    </template>
  </HeaderPage>

  <div v-if="loading">Загрузка...</div>

  <div v-else>
    <div class="wrapper">
      <div v-for="(asteroid, index) in asteroids" :key="index">
        <n-tooltip trigger="hover" placement="top">
          <template #default>
            <div>
              <p>Название: {{ asteroid.name }}</p>
              <p><strong>Дата приближения:</strong>
                {{ asteroid.close_approach_data[0]?.close_approach_date_full || 'Нет данных' }}</p>
              <a :href="asteroid.nasa_jpl_url || '#'" target="_blank">Ссылка на подробности</a>
            </div>
          </template>
          <template #trigger>
            <n-card
                :title="`Астероид ${asteroid.name || 'Неизвестный астероид'}`"
                :class="['themed-card', asteroid.is_sentry_object ? 'sentry-card' : 'normal-card']"
                style="margin-bottom: 5px;">
              <p><strong>Скорость:</strong>
                {{ asteroid.close_approach_data[0]?.relative_velocity?.kilometers_per_second || 'Нет данных' }} км/с</p>
              <p><strong>Расстояние:</strong>
                {{ asteroid.close_approach_data[0]?.miss_distance?.kilometers || 'Нет данных' }} км</p>
              <template #header-extra>
              <span class="header-extra-text">
                {{ asteroid.is_sentry_object ? 'Опасен' : 'Не опасен' }}
              </span>
              </template>
            </n-card>
          </template>
        </n-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderPage from "@/components/HeaderPage.vue";
import {NButton, NIcon, NTooltip} from "naive-ui";
import {Home28Regular} from "@vicons/fluent";
import {ref, onMounted} from "vue";

const today = new Date();


const startDate = new Date(today);
startDate.setDate(today.getDate() - 1);


const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


const formattedStartDate = formatDate(startDate);
const formattedEndDate = formatDate(today);


const apiKey = process.env.VUE_APP_NASA_API_KEY;
const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formattedStartDate}&end_date=${formattedEndDate}&api_key=${apiKey}`;

const asteroids = ref([]);
const loading = ref(true);


const fetchAsteroids = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const allAsteroids = [];
    for (let date = new Date(startDate); date <= today; date.setDate(date.getDate() + 1)) {
      const formattedDate = formatDate(date);
      if (data.near_earth_objects[formattedDate]) {
        allAsteroids.push(...data.near_earth_objects[formattedDate]);
      }
    }
    asteroids.value = allAsteroids;

    console.log(asteroids.value);
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchAsteroids);
</script>

<style scoped>
.themed-card {
  width: 20vw;
  height: 22vh;
}

.normal-card {
  background-color: #6a11cb;
  color: black;
  width: fit-content;
}

.sentry-card {
  background-color: #D001AF;
  width: fit-content;
}

a {
  color: #420684;
  text-decoration: underline;
}

.header-extra-text {
  font-size: 10px;
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}


@media (max-width: 1300px) {
  :deep(.n-card-header__main) {
    font-size: smaller;
  }

}

@media (max-width: 1200px) {
  :deep(.n-card-header) {
    flex-direction: column;
  }

}

@media (max-width: 1020px) {

  :deep(.n-card__content) {
    font-size: smaller;
  }
}

</style>

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
      Астрономическая картинка дня
    </template>
    <router-link v-if="hasFavorites" to="/apod/favorites">
      <n-button ghost color="#8a2be2" class="btn">
        <template #icon>
          <n-icon>
            <Box24Regular/>
          </n-icon>
        </template>
        Избранное
      </n-button>
    </router-link>
  </HeaderPage>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-else-if="loading" class="loading">Loading...</div>
  <div v-else class="apod">
    <n-card style="width: 400px; margin: 10px auto;">
      <h2>{{ apodData.title }}</h2>
      <h3>{{ apodData.date }}</h3>
      <p>Из-за разницы часовых поясов может показываться картинка предыдущего дня</p>
    </n-card>
    <div class="img-wrapper">
      <div class="img-container flex-item">
        <img v-if="apodData.media_type === 'image'" :src="apodData.url" :alt="apodData.title" class="img"/>
        <iframe
            v-else-if="apodData.media_type === 'video'"
            :src="apodData.url"
            class="video"
            frameborder="0"
            allowfullscreen
        ></iframe>
      </div>
      <div class="description-item flex-item">
        <p class="description">{{ apodData.explanation }}</p>
        <n-button
            ghost
            color="#8a2be2"
            class="btn"
            @click="addToFavorites"
        >
          Добавить в избранное
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Box24Regular, Home28Regular} from "@vicons/fluent";
import {NButton, NIcon} from "naive-ui";
import HeaderPage from "@/components/HeaderPage.vue";
import {onMounted, ref} from "vue";
import {openDB, fetchAPOD, addData, fetchFavorites} from "@/services/dbService.js";

const apodData = ref(null);
const loading = ref(true);
const error = ref(null);

import {useNotification} from 'naive-ui';

const notification = useNotification();
const hasFavorites = ref(false);
const addToFavorites = async () => {
  if (apodData.value) {
    const apodToSave = {
      id: apodData.value.date,
      title: apodData.value.title,
      date: apodData.value.date,
      explanation: apodData.value.explanation,
      url: apodData.value.url,
      media_type: apodData.value.media_type,
    };

    try {
      const favorites = await fetchFavorites();
      const isAlreadyFavorite = favorites.some(fav => fav.id === apodToSave.id);

      if (isAlreadyFavorite) {
        notification.warning({
          title: 'Уже в избранном',
          content: `Картинка дня (${apodToSave.title}) уже добавлена в избранное.`,
          duration: 3000,
        });
        hasFavorites.value = favorites.length > 0;
      } else {
        await addData(apodToSave);

        notification.success({
          title: 'Добавлено в избранное',
          content: `Картинка дня (${apodToSave.title}) добавлена в избранное.`,
          duration: 3000,
        });
        const favorites = await fetchFavorites();

        hasFavorites.value = favorites.length > 0;
      }
    } catch (error) {
      notification.error({
        title: 'Ошибка',
        content: 'Произошла ошибка при добавлении в избранное.',
        duration: 3000,
      });
    }
  } else {
    notification.error({
      title: 'Ошибка',
      content: 'Нет данных для добавления в избранное.',
      duration: 3000,
    });
  }
};

onMounted(async () => {
  try {
    apodData.value = await fetchAPOD();
    await openDB();

    const favorites = await fetchFavorites();
    hasFavorites.value = favorites.length > 0;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.img-wrapper {
  padding: 2%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
}

.img {
  width: 100%;
  height: auto;
  border: 5px solid transparent;
  border-radius: 10px;
  border-image: linear-gradient(90deg, #6a11cb, #2575fc) 1;
  overflow: hidden;
}

.video {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  border: 5px solid transparent;
  border-radius: 10px;
  border-image: linear-gradient(90deg, #6a11cb, #2575fc) 1;
  overflow: hidden;
}

.flex-item {
  flex: 1;
}

.description {
  background-color: black;
  font-size: medium;
  height: fit-content;
}

.btn {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn:hover {
  background-color: #48484E;
}
@media (max-width: 900px) {
  .description {
    font-size: small;
  }
  .img-wrapper {
    flex-direction: column;
  }
}
</style>

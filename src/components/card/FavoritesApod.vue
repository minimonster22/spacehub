<template>
  <HeaderPage>
    <template #back-btn>
      <router-link to="/">
        <n-button ghost color="#8a2be2" class="btn">
          <template #icon>
            <n-icon>
              <Home28Regular />
            </n-icon>
          </template>
        </n-button>
      </router-link>
    </template>
    <template #header-title>
      Избранное
    </template>
  </HeaderPage>
  <div v-if="favorites.length === 0">
    <p>Нет сохранённых элементов.</p>
  </div>
  <div v-else class="favorites">
    <n-card
        v-for="favorite in favorites"
        :key="favorite.id"
        class="favorite-card"
    >
      <h2>{{ favorite.title }}</h2>
      <h3>{{ favorite.date }}</h3>
      <div class="favorite-item">
        <p>{{ favorite.explanation }}</p>
        <template v-if="favorite.media_type === 'image'">
          <img :src="favorite.url" :alt="favorite.title" class="img" />
        </template>
        <template v-else-if="favorite.media_type === 'video'">
          <iframe
              :src="favorite.url"
              class="video"
              frameborder="0"
              allowfullscreen
          ></iframe>
        </template>
        <template v-else>
          <p>Тип медиа неизвестен или отсутствует.</p>
        </template>
      </div>
    </n-card>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {fetchFavorites} from "@/services/dbService";
import HeaderPage from "@/components/HeaderPage.vue";
import {NButton, NIcon} from "naive-ui";
import {Home28Regular} from "@vicons/fluent";

const favorites = ref([]);

onMounted(async () => {
  try {
    favorites.value = await fetchFavorites();
  } catch (error) {
    console.error("Ошибка при получении данных из базы", error);
  }
});
</script>

<style scoped>
.favorite-item {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.img {
  width: 100%;
  height: auto;
  border: 2px solid transparent;
  border-radius: 10px;
  border-image: linear-gradient(90deg, #6a11cb, #2575fc) 1;
  overflow: hidden;
}

.video {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  border: 2px solid transparent;
  border-radius: 10px;
  border-image: linear-gradient(90deg, #6a11cb, #2575fc) 1;
  overflow: hidden;
}

.favorite-card {
  margin-bottom: 20px;
}

.btn {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn:hover {
  background-color: #48484E;
}
</style>

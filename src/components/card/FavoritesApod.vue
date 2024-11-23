<template>
  <h1>Избранное</h1>
  <div v-if="favorites.length === 0">
    <p>Нет сохранённых картинок.</p>
  </div>
  <div v-else class="favorites">
    <n-card
        v-for="favorite in favorites"
        :key="favorite.id">

        <h2>{{ favorite.title }}</h2>
        <h3>{{ favorite.date }}</h3>
      <div class="favorite-item">
        <p>{{ favorite.explanation }}</p>
        <img :src="favorite.url" :alt="favorite.title" class="img"/>
      </div>
    </n-card>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {fetchFavorites} from "@/services/dbService";

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
}


</style>
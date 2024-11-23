<template>
  <HeaderPage>
    <router-link to="/apod/favorites">
      <n-button ghost color="#8a2be2" class="favorite-btn">
        <template #icon>
          <n-icon>
            <Box24Regular/>
          </n-icon>
        </template>
        <p>Избранное</p>
      </n-button>
    </router-link>
  </HeaderPage>


  <h1> Астрономическая картинка дня </h1>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-else-if="loading" class="loading">Loading...</div>
  <div v-else class="apod">
    <n-card style="width: 400px; margin: 0 auto;">
      <h2>{{ apodData.title }}</h2>
      <h3>{{ apodData.date }} </h3>
      <p>Из-за разницы часовых поясов может показываться картинка предыдущего дня</p>
    </n-card>
    <div class="img-wrapper">
      <div class="img-container flex-item">
        <img :src="apodData.url" :alt="apodData.title" class="img"/>
      </div>
      <p class="flex-item description">{{ apodData.explanation }}</p>
    </div>
  </div>

</template>

<script setup>
import {Box24Regular} from '@vicons/fluent'
import {NButton, NIcon} from 'naive-ui';
import HeaderPage from "@/components/HeaderPage.vue";
import {onMounted, ref} from "vue";
import {openDB, addData, fetchAPOD} from '@/services/dbService.js';

const apodData = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    apodData.value = await fetchAPOD();
    openDB();
    const apodToSave = {
      id: apodData.value.date,
      title: apodData.value.title,
      date: apodData.value.date,
      explanation: apodData.value.explanation,
      url: apodData.value.url
    };
    addData(apodToSave);
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

.flex-item {
  flex: 1;
}

.description {
  background-color: black;
  font-size: medium;
  height: fit-content;
}

</style>
